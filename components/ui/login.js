import { Box, Text } from 'daxiao_ui_common';
import { Button, Heading } from 'grommet';

const Login = ({ head, text, login = () => {} }) => {
  //console.log('login',login);

  return (
    <Box height='100vh' gap='20px' flex={{ grow: 1 }} align='center' justify='center'>
      <Heading level={3} size='large'>
        {head}
      </Heading>
      <Text>{text}</Text>

      <Button
        style={{
          minWidth: '110px',
          minHeight: '40px',
          marginTop: '50px',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          cursor: 'pointer',
        }}
        primary={true}
        onClick={login}
        label='登录'
      ></Button>
    </Box>
  );
};

export { Login };
