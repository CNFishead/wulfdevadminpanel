import { useUser } from '@/state/auth';
import { useSocketStore } from '@/state/socket';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import io from 'socket.io-client';

type Props = {
  children: React.ReactNode;
};
const AppWrapper = (props: Props) => {
  const queryClient = useQueryClient();
  //Set up state
  const router = useRouter();
  const token = router.query.token as string;
  const { data: loggedInData, isLoading: userIsLoading } = useUser(token);

  //Set up socket connection
  const { socket, isConnecting, setSocket, setIsConnecting } = useSocketStore(
    (state) => state
  );

  useEffect(() => {
    if (process.env.API_URL) {
      console.log(process.env.API_URL.replace('/api/v1', ''));

      setIsConnecting(true);

      const socket = io(process.env.API_URL.replace('/api/v1', ''));

      socket.on('connect', () => {
        console.log('connected');
        setIsConnecting(false);
        setSocket(socket);
      });

      return () => {
        socket.disconnect();
      };
    }

    // Add in the support widget
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'ze-snippet';
    script.src =
      'https://static.zdassets.com/ekr/snippet.js?key=d18579d0-71b7-4391-b355-f5ccd2014555';
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    //If there is a user and a socket connection, setup a setup event with the user data

    if (socket && isConnecting) {
      // Listen for user updates
      socket.emit('setup', loggedInData?.user);
      socket.on('updateUser', () => {
        queryClient.invalidateQueries(['user']);
      });
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <>
      {props.children}
    </>
  );
};

export default AppWrapper;
