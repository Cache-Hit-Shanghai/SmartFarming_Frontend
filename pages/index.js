import { withProjectPage } from '../components';
import {
  Button,
  Clock,
  Header,
  Box,
  Text,
  Heading,
  Grid,
  Meter,
  Stack,
  DataChart,
  Select,
  CheckBox,
  Grommet,
} from 'grommet';
import { Cloud, PowerShutdown, Sun, User } from 'grommet-icons';
import { useEffect, useState, useRef } from 'react';
import { Map, APILoader, CustomOverlay, Marker } from '@uiw/react-baidu-map';

//* Function

/**
 *
 * @param {BMap.Map} map
 * @returns
 */
function mapSetFitView(map) {
  if (!map) return;

  const points = [];
  map.getOverlays().forEach((overlay) => {
    if (!overlay.isVisible()) return;
    points.push(overlay.getPosition());
  });
  map.setViewport(points);
}

//* Component

const Section = ({ title, children, ...passProps }) => {
  return (
    <Box width='100%' height='100%' border={true} {...passProps}>
      <Box
        height='6vh'
        width='100%'
        background='light-2'
        border='bottom'
        pad={{ left: 'small' }}
        justify='center'
      >
        <Text weight='bold' color='black'>
          {title}
        </Text>
      </Box>
      <Box flex='grow'>{children}</Box>
    </Box>
  );
};

const MainSectionInfoLayer = ({ tab }) => {
  switch (tab) {
    case '作物信息': {
      return (
        <Box width='100%' direction='row' gap='small' align='center'>
          <Box background='brand' round='small' width='10vh' height='10vh' align='center' justify='center'>
            Photo
          </Box>
          <Box gap='xsmall'>
            <Box direction='row' gap='small'>
              <Text>蝉茶种植2</Text>
              <Box background='rgba(255,255,255,0.2)' round='medium' pad={{ horizontal: 'small' }}>
                <Text color='rgba(0,0,0,0.5)'>已结束</Text>
              </Box>
            </Box>
            <Box direction='row' gap='medium'>
              <Text size='small'>红茶</Text>
              <Text size='small'>5000株</Text>
            </Box>
            <Text size='small'>2022-05-25 到 2022-07-24</Text>
          </Box>
          <Box gap='xsmall' flex='grow' pad={{ left: 'small' }}>
            <Box direction='row' gap='30%' justify='center' align='center'>
              {[
                { value: '1648℃', label: '积温' },
                { value: '119703wh/m2', label: '有效辐射' },
              ].map(({ value, label }) => (
                <Box key={label}>
                  <Text size='small'>{value}</Text>
                  <Text size='small'>{label}</Text>
                </Box>
              ))}
            </Box>
            <Meter value={100} max={100} color='brand' round={true} size='full' thickness='xsmall' />
            <Box direction='row' align='center'>
              <Text size='small'>已成长60天</Text>
              <Box direction='row' flex='grow' justify='end'>
                <Text size='small'>已完成100%</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    }
    case '基地信息': {
      return (
        <Box direction='row' wrap='true' height='12vh'>
          {[
            { label: '编号', value: 'F00007000700004e(78)' },
            { label: '地区', value: '广东省河源市紫金县' },
            { label: '状态', value: '正常' },
            { label: '负责人', value: '智汇耘' },
            { label: '面积', value: '18.34 亩' },
          ].map(({ label, value }) => (
            <Box key={label} width='50%' direction='row'>
              <Box width='30%'>{label}</Box>
              <Box flex={true}>{value}</Box>
            </Box>
          ))}
        </Box>
      );
    }
    case '天气情况': {
      return (
        <Box direction='row' gap='small' align='center'>
          <Box gap='small'>
            <Heading level={3} margin='0px'>
              7℃
            </Heading>
            <Text>3 - 10℃</Text>
          </Box>
          <Box gap='small'>
            <Text>阴</Text>
            <Text>1月16日 周一</Text>
          </Box>
          <Cloud size='large' />
          <Box flex='grow' gap='small'>
            <Box
              width='100%'
              background={{ color: 'white', opacity: 0.2 }}
              pad={{ horizontal: 'small' }}
              round='xsmall'
            >
              未来两小时不会下雨，放心出门吧
            </Box>
            <Box direction='row' justify='between' width='90%' alignSelf='center'>
              {[
                { day: '周二', temperature: '3/13℃' },
                { day: '周三', temperature: '6/16℃' },
                { day: '周四', temperature: '4/18℃' },
                { day: '周五', temperature: '7/18℃' },
              ].map(({ day, temperature }) => (
                <Box key={day} gap='medium' align='center'>
                  <Text>{day}</Text>
                  <Text size='small'>{temperature}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      );
    }
    default:
      return;
  }
};

const MainSection = ({ ...passProps }) => {
  const mapPointsData = [
    {
      name: '黄花茶山',
      position: { lng: 121.444895, lat: 31.21246 },
      details: [
        { label: 'EC', value: '45.0' },
        { label: '土壤温度', value: '6.0' },
        { label: '土壤湿度', value: '5.8' },
        { label: '空气温度', value: '9.8' },
        { label: '空气湿度', value: '70.3' },
        { label: '光照', value: '32809.0' },
      ],
    },
    {
      name: '中药种植',
      position: { lng: 121.611621, lat: 31.293465 },
      details: [
        { label: 'EC', value: '45.0' },
        { label: '土壤温度', value: '6.0' },
        { label: '土壤湿度', value: '5.8' },
        { label: '空气温度', value: '9.8' },
        { label: '空气湿度', value: '70.3' },
        { label: '光照', value: '32809.0' },
      ],
    },
  ];

  const [tab, setTab] = useState('作物信息');
  const [mapAPILoader, setMapAPILoader] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState();
  /**@type {{current: BMap.Map}} */
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;
    setMapAPILoader(
      <APILoader akay='9ObPZsFGsmHvKU20DEWRkVAeYxR5I71e'>
        <Map
          enableScrollWheelZoom={true}
          ref={(props) => {
            if (!props?.map) return;

            map.current = props.map;
          }}
          center='上海'
          zoom={12}
        >
          {mapPointsData.map(({ name, position }) => (
            <Marker key={name} position={position} title={name} type='loc_red' />
          ))}
        </Map>
      </APILoader>
    );
  }, []);

  return (
    <Box width='100%' height='100%' border={true} {...passProps}>
      <Box
        height='6vh'
        width='100%'
        background='light-2'
        border='bottom'
        pad={{ horizontal: 'small' }}
        align='center'
        direction='row'
        gap='small'
      >
        <Box width='20%' height='80%' background='brand' align='center' justify='center'>
          <Select name='base' options={['所有基地', '我的基地']} defaultValue='所有基地' plain size='small' />
        </Box>
        <Box height='100%' direction='row' align='center' gap='small'>
          {['作物信息', '基地信息', '天气情况'].map((label) => {
            const selected = tab === label;
            return (
              <Box
                key={label}
                onClick={() => setTab(label)}
                background={selected ? { color: 'grey' } : ''}
                pad='5px'
                focusIndicator={false}
              >
                <Text color={selected ? 'white' : 'dark-3'}>{label}</Text>
              </Box>
            );
          })}
        </Box>
        <Box flex='grow' direction='row' justify='end'>
          <CheckBox
            label='卫星图'
            onChange={(event) => {
              map.current.setMapType(event.target.checked ? BMAP_SATELLITE_MAP : BMAP_NORMAL_MAP);
            }}
          />
        </Box>
      </Box>
      <Box flex='grow' style={{ position: 'relative' }}>
        <div style={{ width: '100%', height: '100%' }}>{mapAPILoader}</div>
        <Box
          width='100%'
          height={{ min: '15%' }}
          background='rgba(0,0,0,0.5)'
          pad='medium'
          style={{ position: 'absolute', top: '0px', left: '0px' }}
        >
          <MainSectionInfoLayer tab={tab} />
        </Box>
        <Box
          width='100%'
          height='18vh'
          style={{ position: 'absolute', bottom: '0px' }}
          direction='row'
          gap='small'
          pad={{ horizontal: 'medium', bottom: 'small' }}
          justify='center'
        >
          {mapPointsData.map(({ name, details, position }) => (
            <Box
              key={name}
              width='30%'
              background='rgba(0,0,0,0.5)'
              align='center'
              justify='center'
              pad='small'
              gap='small'
              onClick={() => {
                map.current.setCenter(new BMap.Point(position.lng, position.lat));
                setSelectedPoint(name);
              }}
              focusIndicator={false}
              border={selectedPoint === name ? { style: 'dashed', color: 'black', size: 'medium' } : null}
            >
              <Text size='small' weight='bold'>
                {name}
              </Text>
              <Box direction='row' wrap={true} style={{ rowGap: '10px' }}>
                {details.map(({ label, value }) => (
                  <Box key={label} align='center' width='33%'>
                    <Text size='small'>{label}</Text>
                    <Text size='small'>{value}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const MyHeader = () => {
  return (
    <Header background='brand' pad={{ horizontal: 'medium' }} height='9vh'>
      <Box width='25%' direction='row' gap='medium' align='end' height='100%' pad={{ bottom: 'small' }}>
        {/* <Clock type='digital' /> */}
        <Text size='1vw'>{new Date().toLocaleDateString()}</Text>
      </Box>
      <Box width='50%' align='center' justify='center'>
        <Heading size='3vw'>智慧田园物联网平台</Heading>
      </Box>
      <Box flex='grow' direction='row' gap='medium' justify='end' align='center'>
        <Box direction='row'>
          <User />
          <Text>用户001</Text>
        </Box>
        <Box direction='row'>
          <PowerShutdown />
          <Button plain>退出</Button>
        </Box>
      </Box>
    </Header>
  );
};

const Content = () => {
  return (
    <Grid
      pad='small'
      width='100%'
      rows={['70vh', '35vh']}
      columns={['20%', 'auto', '20%']}
      gap='small'
      areas={[
        { name: '基地种类', start: [0, 0], end: [0, 0] },
        { name: 'MainSection', start: [1, 0], end: [1, 0] },
        { name: '设备统计', start: [2, 0], end: [2, 0] },
        { name: 'DataMonthLeft', start: [0, 1], end: [0, 1] },
        { name: '实时数据', start: [1, 1], end: [1, 1] },
        { name: 'DataMonthRight', start: [2, 1], end: [2, 1] },
      ]}
    >
      <Section gridArea='基地种类' title='基地种类'>
        <Box fill={true} align='center' justify='center' pad='medium' direction='row' gap='small'>
          <Box width='60%'>
            <Stack anchor='center'>
              <Meter
                type='circle'
                thickness='large'
                values={[
                  { value: 3, color: 'graph-0' },
                  { value: 3, color: 'graph-1' },
                  { value: 2, color: 'graph-2' },
                ]}
                max={8}
              />
              <Box align='center'>
                <Text>总计</Text>
                <Text>8</Text>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Text color='graph-0'>果园 3</Text>
            <Text color='graph-1'>茶园 3</Text>
            <Text color='graph-2'>菜地 2</Text>
          </Box>
        </Box>
      </Section>
      <MainSection gridArea='MainSection' />
      <Section gridArea='设备统计' title='设备统计'>
        <Box fill={true} align='center' justify='center' pad='medium' direction='row' gap='small'>
          <Box width='60%'>
            <Stack anchor='center'>
              <Meter
                type='circle'
                thickness='large'
                values={[
                  { value: 36, color: 'graph-0' },
                  { value: 21, color: 'graph-1' },
                  { value: 15, color: 'graph-2' },
                  { value: 97, color: 'graph-3' },
                ]}
                max={169}
              />
              <Box align='center'>
                <Text>总计</Text>
                <Text>169</Text>
              </Box>
            </Stack>
          </Box>
          <Box>
            <Text color='graph-0'>开关 36</Text>
            <Text color='graph-1'>集中器 21</Text>
            <Text color='graph-2'>空气湿度 15</Text>
            <Text color='graph-3'>其他 97</Text>
          </Box>
        </Box>
      </Section>
      <Section gridArea='DataMonthLeft' title='数据月趋势：光照'>
        <Box fill={true} pad='small'>
          <DataChart
            size='fill'
            data={[
              { date: '2020-08-20', amount: 2 },
              { date: '2020-08-21', amount: 47 },
              { date: '2020-08-22', amount: 33 },
            ]}
            series={['date', { property: 'amount' }]}
            chart={[
              {
                property: 'amount',
                type: 'area',
                thickness: 'xsmall',
                color: 'brand',
                opacity: 'medium',
              },
              { property: 'amount', type: 'line', opacity: 'medium', thickness: 'xsmall' },
              { property: 'amount', type: 'point', point: 'circle', thickness: 'small' },
            ]}
            guide={{ x: { granularity: 'fine' }, y: { granularity: 'fine' } }}
          />
        </Box>
      </Section>
      <Section gridArea='实时数据' title='实时数据'>
        <Box pad='small' fill={true} direction='row'>
          <Box width='40%' height='100%' background='black' align='center' justify='center'>
            Video
          </Box>
          <Box
            flex='grow'
            direction='row'
            pad={{ horizontal: 'small' }}
            gap='small'
            align='center'
            justify='center'
          >
            {[
              {
                label: '空气温度',
                values: { current: '7.5°C', average: '5.01°C', max: '7.6°C' },
                icon: <Sun size='large' />,
              },
              {
                label: '空气湿度',
                values: { current: '75.6%', average: '82.2%', max: '86.2%' },
                icon: <Sun size='large' />,
              },
            ].map(({ label, values, icon }) => (
              <Box key={label} width='40%' gap='medium'>
                {[
                  { key: 'current', value: '当前' },
                  { key: 'average', value: '平均' },
                  { key: 'max', value: '最高' },
                ].map(({ key, value }) => (
                  <Box key={key} flex='grow' width='100%' direction='row' gap='small'>
                    {icon}
                    <Box flex>
                      <Text>{value + label}</Text>
                      <Text>{values[key]}</Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Section>
      <Section gridArea='DataMonthRight' title='数据月趋势：EC'>
        <Box fill={true} pad='small'>
          <DataChart
            size='fill'
            data={[
              { date: '2020-08-20', amount: 2 },
              { date: '2020-08-21', amount: 47 },
              { date: '2020-08-22', amount: 33 },
            ]}
            series={['date', { property: 'amount' }]}
            chart={[
              {
                property: 'amount',
                type: 'area',
                thickness: 'xsmall',
                color: 'brand',
                opacity: 'medium',
              },
              { property: 'amount', type: 'line', opacity: 'medium', thickness: 'xsmall' },
              { property: 'amount', type: 'point', point: 'circle', thickness: 'small' },
            ]}
            guide={{ x: { granularity: 'fine' }, y: { granularity: 'fine' } }}
          />
        </Box>
      </Section>
    </Grid>
  );
};

const Component = () => {
  return (
    // <Grommet theme={{ global: { font: { size: '1.2vw' } }, text: { medium: { size: '1.2vw' } } }}>
    <Box flex='grow'>
      <MyHeader />
      <Content />
    </Box>
    // </Grommet>
  );
};

const Page = withProjectPage({ Component });

const getServerSideProps = Page.makeGetServerSideProps();

export { getServerSideProps };

export default Page;
