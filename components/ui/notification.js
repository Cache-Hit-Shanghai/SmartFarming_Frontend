import React, { useEffect, useState } from 'react';

import { FormClose } from 'grommet-icons';

import { Box, Button, Layer, Text } from 'grommet';

import color from 'daxiao_ui_common/data/color';
//console.log('color', color);

const NotificationLayer = (props) => {
  //console.log('NotificationLayer', props);
  let showColor = color[props.color];
  showColor ??= color.unknown;
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    props.open != open && setOpen(props.open);
  }, [props.open]);

  return open ? (
    <Layer
      position='bottom'
      className='JuJiu_Noti_Glo'
      modal={false}
      margin={{ vertical: 'medium', horizontal: 'small' }}
      onEsc={props.onClose}
      responsive={false}
      plain
    >
      <Box
        align='center'
        direction='row'
        gap='small'
        justify='between'
        round='medium'
        elevation='medium'
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background={showColor.color}
      >
        <Box align='center' width='large' direction='row' gap='xsmall'>
          <showColor.icon />
          <Text wordBreak='break-all'>{props.t ? props.t(props.message) : props.message}</Text>
        </Box>
        <Button
          icon={<FormClose />}
          onClick={() => {
            setOpen(false);
            props.onClose && props.onClose();
          }}
          plain
          style={{ ...props.btnStyle }}
        />
      </Box>
    </Layer>
  ) : null;
};

export { NotificationLayer };
