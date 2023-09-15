import { useEffect, useRef } from 'react';

// This imports the functional component from the previous sample.
import styles from './VideoPlayer.module.scss';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

type Props = {
  video: any;
};
const VideoPlayer = (props: Props) => {
  const videoRef = useRef();
  const playerRef = useRef();

  const options = {
    controls: true,
    id: 'Video',
    nativeControlsForTouch: false,
    autoplay: 'play',
    poster: props.video.imageUrl,
    playbackRates: [0.5, 1, 1.5, 2],

    controlBar: {
      pictureInPicture: true,
      muteToggle: false,
      timeDivider: false,
      durationDisplay: true,
      progressControl:
        props.video.status === 'streaming' || props.video.status === 'prestream'
          ? false
          : true,
    },
    sources: [
      {
        src:
          props.video.status === 'streaming' ||
          props.video.status === 'prestream'
            ? `https://${props.video.videoUrl}/tcproedge/_definst_/MP4:${props.video.user.username}/${props.video.user.livestream.pass}/playlist.m3u8`
            : props.video.videoUrl,
        type:
          props.video.status === 'streaming' ||
          props.video.status === 'prestream'
            ? 'application/x-mpegURL'
            : 'video/mp4',
      },
    ],
  };

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = ((playerRef as any).current = videojs(
        videoElement,
        options,
        () => {
          videojs.log('player is ready');
        }
      ));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      if (player && options) {
        (player as any).autoplay(options.autoplay);
        (player as any).src(options.sources);
      }
    }
  }, [props.video]);

  return (
    <div
      className={`${styles.videoContainer} ${
        (props.video?.status === 'streaming' ||
          props.video?.status === 'prestream') &&
        styles.live
      } ${props.video?.status === 'prestream' && styles.prestream}`}
    >
      <div data-vjs-player>
        <video
          onContextMenu={(e) => e.preventDefault()}
          ref={videoRef as any}
          className={`video-js vjs-big-play-centered vjs-fluid`}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
