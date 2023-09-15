import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Page from "../layout/page/Page.layout";
import { Col, Row } from "antd";
import PageLayout from "../layout/page/Page.layout";

export default function NotFound() {
  const navigate = useRouter();

  const [count, setCount] = useState(10);
  const timer = setTimeout(() => {
    setCount(count - 1);
  }, [1000]);
  useEffect(() => {
    const autoNav = setTimeout(() => {
      navigate.push("/");
    }, 10000);

    return () => {
      clearTimeout(autoNav);
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <PageLayout pages={[{ title: "404", href: "/404" }]}
    >
      <div style={{ margin: "15% auto", textAlign: "center", width: '100%', padding: '2%' }}>
        <Row justify={'center'} style={{display: 'flex', flexDirection: 'column' }}>
            <h1>404 - Page Not Found</h1>
            <p>
              You will be redirected to <Link href="/">Homepage</Link> in {count}s
            </p>
        </Row>
      </div>
    </PageLayout>
  );
}
