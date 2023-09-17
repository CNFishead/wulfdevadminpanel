import { useUser } from '@/state/auth';
import { useLayoutStore } from '@/state/ui/layout';
import { ControlNavItem } from '@/types/navigation';
import { FEATURES, hasFeature } from '@/utils/hasFeature';
import Auth from '@/views/auth/Auth.view';
import Head from 'next/head';
import { ReactNode } from 'react';
import { AiFillControl } from 'react-icons/ai';
import Meta from '../../components/meta/Meta.component';
import Control from '../control/Control.layout';
import Header from '../header/Header.layout';
import SideBar from '../sideBar/SideBar.layout';
import styles from './Page.module.scss';

//make a type with children as a prop
type Props = {
  children: React.ReactNode;
  pages: Array<{ title: string; link?: string; icon?: ReactNode }>;
  largeSideBar?: boolean;
  backgroundColor?: string;
  hideControlLayout?: boolean;
  controlNav?: Array<ControlNavItem>;
  neededFeature?: any;
  enableBlockCheck?: boolean;
};
const PageLayout = (props: Props) => {
  const sideBarOpen = useLayoutStore((state) => state.sideBarOpen);
  const controlLayoutOpen = useLayoutStore((state) => state.controlLayoutOpen);
  const toggleControlLayout = useLayoutStore(
    (state) => state.toggleControlLayout
  );

  const { data: loggedInData } = useUser();

  return (
    <>
      <Meta
        title={props.pages ? `Howard Panel ${props.pages[props.pages.length - 1].title}` : ''}
      />

      <div
        className={`${styles.container} ${
          props.largeSideBar ? '' : styles.small
        } ${sideBarOpen && styles.sideBarActive}`}
      >
        {loggedInData ? (
          <>
            <Header pages={props.pages} />
            <div className={styles.sideBar}>
              {props.pages && (
                <SideBar page={props.pages[0]} large={props.largeSideBar} />
              )}
            </div>
            <div
              className={`${styles.content} ${
                controlLayoutOpen &&
                styles.controlContainerActive
              } ${
                props.controlNav &&
                !props.hideControlLayout &&
                styles.controlBarActive
              }`}
              style={{
                backgroundColor: props.backgroundColor,
              }}
            >
              {props.controlNav &&
                !props.hideControlLayout && (
                  <>
                    <div className={styles.controlContainer}>
                      <Control navigation={props.controlNav} />
                    </div>

                    <div
                      className={styles.controlToggleBtn}
                      onClick={() => toggleControlLayout()}
                    >
                      <AiFillControl />
                    </div>
                  </>
                )}

              <div className={styles.childrenWrapper}>
                <div className={styles.childrenContainer}>
                  <>{props.children}</>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Auth />
        )}
      </div>
    </>
  );
};
export default PageLayout;
