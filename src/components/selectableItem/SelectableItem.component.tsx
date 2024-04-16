import React, { useState } from 'react';
import styles from './SelectableItem.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { NProgressLoader } from '../nprogress/NProgressLoader.component';

type Props = {
  imageUrl: string;
  link: string;
  overlayChildren?: React.ReactNode;
  children: React.ReactNode;
  options: MenuProps['items'];
  loading?: boolean;
  isLink?: boolean;
};

const SelectableItem = (props: Props) => {
  const [hoverEllipsis, setHoverEllipsis] = useState(false);

  const WrappedComponent = props.isLink ? Link : 'div';
  return (
    <WrappedComponent
      className={styles.wrapper}
      href={hoverEllipsis || props.link === '' ? '#' : props.link}
    >
      <div className={styles.container}>
        {props.loading && <NProgressLoader />}
        <div className={styles.imageContainer}>
          <Image
            src={props.imageUrl}
            alt={props.imageUrl}
            width={200}
            height={130}
            className={styles.image}
          />
          <div className={styles.overlay}>
            {props.overlayChildren}
            {props.options && props.options?.length > 0 && (
              <Dropdown
                menu={{ items: props.options }}
                onOpenChange={(open) => {
                  if (open) {
                    setHoverEllipsis(true);
                  } else {
                    setHoverEllipsis(false);
                  }
                }}
              >
                <div
                  className={styles.ellipsis}
                  // onMouseEnter={() => setHoverEllipsis(true)}
                  // onMouseLeave={() => setHoverEllipsis(false)}
                >
                  <AiOutlineEllipsis className={styles.icon} />
                </div>
              </Dropdown>
            )}
          </div>
        </div>

        <div className={styles.videoDetails}>{props.children}</div>
      </div>
    </WrappedComponent>
  );
};

export default SelectableItem;
