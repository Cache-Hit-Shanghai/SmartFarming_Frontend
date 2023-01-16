import { Util } from 'daxiao_js_common';
import { useOidc, useUser } from 'daxiao_ui_common/state';
import { removeCookieList } from 'daxiao_js_common/net';
import { Header, Anchor, Box, Paragraph, Drop, Button, Menu, Text } from 'grommet';
import { User, Logout, Group, Cloud } from 'grommet-icons';
import Router from 'next/router';
// import setLanguage from 'next-translate/setLanguage';
// import useTranslation from 'next-translate/useTranslation';
// import { SelectLanguageGrommet } from '../index';
import { sessionKey, tokenKey } from '../../data/cookie';
const logout = () => {
  removeCookieList([tokenKey, sessionKey]);
  localStorage.clear();
};

const onSelect = ({ value }) => {
  Util.setCookieByKey({ key: 'LngLocale', value });
};

const Head = ({ list = [], background, headerStyle = {}, href, iconBackground, iconColor }) => {
  const { manager, signout } = useOidc();
  const userInfo = useUser();
  // const { username = '', name = '' } = userInfo || {};
  //console.log('userInfo', userInfo);
  const lang = '';
  // const { lang } = useTranslation();

  const listItem = list?.map((item) => {
    return {
      label: <Box align='center'>{item.label}</Box>,
      onClick: item.onClick,
      icon: (
        <Box pad={{ right: 'small' }}>
          <item.icon />
        </Box>
      ),
    };
  });

  return (
    <Header
      background={background || 'white'}
      width='100%'
      flex={{ shrink: 0 }}
      direction='row'
      pad={{ horizontal: 'medium', vertical: 'xsmall' }}
      border='bottom'
      justify='start'
      {...headerStyle}
    >
      {/* <Anchor href={`/${lang}`}>
        <Box direction='row' gap='small' align='center'>
          <Cloud color='brand' />
          <Text>雎鸠OTA</Text>
        </Box>
      </Anchor> */}
      <Box width='1' flex={{ grow: 1 }}></Box>
      {/* <SelectLanguageGrommet onSelect={onSelect} /> */}
      <Box direction='row' align='center' gap='20px'>
        <Text>{userInfo?.info?.nickName || ''}</Text>
        {userInfo?.info?.avatarUrl && (
          <img
            style={{
              borderRadius: '50%',
            }}
            width='60'
            height='60'
            src={userInfo?.info?.avatarUrl}
          ></img>
        )}
      </Box>
      {/* <Menu
        icon={true}
        label={
          <Box direction='row' gap='small' align='center'>
            <Box background={iconBackground || 'brand'} pad='xsmall' round>
            </Box>
            <Text>{userInfo?.info?.nickName || ''}</Text>
          </Box>
        }
        items={[
          ...listItem,
          {
            label: <Box align='center'>退出登录</Box>,
            onClick: () => {
              logout();
              signout();
            },
            icon: (
              <Box pad={{ right: 'small' }}>
                <Logout />
              </Box>
            ),
          },
        ]}
      ></Menu> */}
    </Header>
  );
};

export { Head };
