import { makePage, Box, Text, WarnUI } from 'daxiao_ui_common';
import { useOidc, useUser } from 'daxiao_ui_common/state';
import { useEffect, useState } from 'react';
import { Util } from '../util';
import { Head, Login, NotificationLayer } from './index';
import { LinkPrevious } from 'grommet-icons';
import { Grommet } from 'grommet';
import Router from 'next/router';

// color: 'error',
// message: '',
// open: false,

const withProjectPage = ({
  getData,
  show: { back = true } = {},
  Component = () => null,
  fnc = {},
  head = {},
}) => {
  const PageComponent = ({ token = true, delegate, passProps: { data, host }, ...pageProps }) => {
    const { manager, signin } = useOidc();
    const [noti, setNoti] = useState({ color: '', message: '', open: false });
    useEffect(() => {
      delegate?.setNotification(() => setNoti);
    }, []);
    //console.log('PageComponent',pageProps);

    return (
      <Grommet full>
        {true ? (
          <Box width='100vw' height='100vh'>
            <WarnUI />
            <Head headerStyle={head.style?.header} />
            <Box
              width='100vw'
              height='100%'
              flex={{ shrink: 1, grow: 1 }}
              alignSelf='center'
              overflow='auto'
              style={{ minWidth: '200px', boxSizing: 'border-box' }}
            >
              {/* {back && <NavBack />} */}
              <Component {...data} {...delegate} host={host} fnc={fnc} {...pageProps} />
              <NotificationLayer {...noti}></NotificationLayer>
            </Box>
          </Box>
        ) : (
          <Login head='jujiu webrtc camera' text='' login={signin}></Login>
        )}
      </Grommet>
    );
  };
  return makePage({
    Component: PageComponent,
    getData,
    oidcConfig: {
      getOidc: Util.getOidcConfig,
    },
    getUser: Util.getUserInfo,
    login: false,
    needUserInfo: true,
  });
};

export { withProjectPage };
