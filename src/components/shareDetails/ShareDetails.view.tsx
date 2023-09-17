import CopyField from '@/components/copyField/CopyField.component';
import { Checkbox, Form, Input, message, Skeleton } from 'antd';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import {
  FaClipboardCheck,
  FaCopy,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

import styles from './ShareDetails.module.scss';

type Props = {
  streamLink: string;
  embedCode?: string;
  embedLink?: string;
};

const ShareDetails = (props: Props) => {
  const share = [
    {
      icon: <FaFacebookF />,
      key: 'facebook',
      link: `https://www.facebook.com/dialog/share?app_id=87741124305&display=popup&href=${props.streamLink}`,
    },
    {
      icon: <FaTwitter />,
      key: 'twitter',
      link: `https://twitter.com/intent/tweet?url=${props.streamLink}`,
    },
    {
      icon: <FaLinkedinIn />,
      key: 'linkedin',
      link: `https://www.linkedin.com/shareArticle/?url=${props.streamLink}`,
    },
    {
      icon: <FaWhatsapp />,
      key: 'whatsapp',
      link: `https://api.whatsapp.com/send?text=${props.streamLink}`,
    },
    {
      icon: <FaEnvelope />,
      key: 'email',
      link: `mailto:?subject=Check out this playlist on Truthcasting&body=${props.streamLink}`,
    },
  ];

  return (
    <div className={styles.container}>
      <Form layout="vertical">
        <Form.Item
          name="streamLink"
          label="Stream Link"
          tooltip="
          This is the link to the video on stream.truthcasting.com. You can share this link with anyone and they will be able to watch the video.
          
          "
        >
          <a
            href={props.streamLink}
            className={styles.link}
            target="
          _blank"
            rel="noopener noreferrer"
          >
            {props.streamLink}
          </a>
        </Form.Item>
        {props.embedLink && (
          <Form.Item
            name="embedPage"
            label="Embed Page Link"
            tooltip="
          This is the link to the video on your personal embed page. You can share this link with anyone and they will be able to watch the video."
          >
            <a
              href={props.embedLink}
              className={styles.link}
              target="
          _blank"
              rel="noopener noreferrer"
            >
              {props.embedLink}
            </a>

            {/* TODO <Form.Item name="premiumLinkOptions" label="Premium Link Options">
            <Checkbox.Group onChange={onChangePremiumEmbedOptions}>
              <Checkbox value="Bible">Bible</Checkbox>
              <Checkbox value="Notes">Notes</Checkbox>
              <Checkbox value="Comments">Comments</Checkbox>
              <Checkbox value="Chat">Chat</Checkbox>
            </Checkbox.Group>
          </Form.Item> */}
          </Form.Item>
        )}
        {props.embedCode && (
          <Form.Item
            name="embed"
            label="Embed"
            tooltip="
          This is the embed code for the video. You can copy and paste this code into your website to embed the video."
          >
            <CopyField data={props.embedCode} />
          </Form.Item>
        )}

        <Form.Item
          name="share"
          label="Share"
          tooltip="Share this playlist on social media. Just click on the icon."
        >
          <div className={styles.share}>
            {share.map((item) => (
              <a
                href={item.link}
                key={item.key}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>{item.icon}</div>
              </a>
            ))}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShareDetails;
