import { Href, Link } from 'expo-router';
import React, { ReactNode } from 'react';
import { Platform } from 'react-native';

const WebLink = ({ href, children }: { href: string | Href<unknown>; children: ReactNode }) => {
  if (Platform.OS === 'web') {
    return (
      <a href={href} target="_blank" style={{ textDecoration: 'none' }}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={{
        pathname: '/webview',
        params: {
          uri: href
        }
      }}
    >
      {children}
    </Link>
  );
};

export default WebLink;
