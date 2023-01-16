import { withProjectPage } from '../components';
import { Box, Text } from 'daxiao_ui_common';
import Router from 'next/router';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from 'grommet';
import { Close } from 'grommet-icons';

const Component = () => {
  return <MyHeader></MyHeader>;
};

const Page = withProjectPage({ Component });

const getServerSideProps = Page.makeGetServerSideProps();

export { getServerSideProps };

export default Page;
