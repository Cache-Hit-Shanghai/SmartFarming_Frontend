import { withProjectPage } from '../components';
import { Box, Text } from 'daxiao_ui_common';
import Router from 'next/router';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Button } from 'grommet';
import { Close } from 'grommet-icons';

const Component = () => {
  return (
    <Box pad='10px' height='100%' gap='20px' flex={{ shrink: 1 }} background='#f5f5f5'>
      home
    </Box>
  );
};

const Page = withProjectPage({ Component });

const getServerSideProps = Page.makeGetServerSideProps();

export { getServerSideProps };

export default Page;
