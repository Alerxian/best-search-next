import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Link,
  Skeleton,
  Toolbar,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/system';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import TrendChart from '../../src/components/trend-chart';
import { fetchLists, onSearchChange } from '../../src/store/searchSlice';

const SearchPage: FC = () => {
  // 从state中获取value
  const { initValue, dataList, status } = useAppSelector(
    (state) => state.search
  );
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { key: searchKey } = router.query as { key: string };

  const handleClick = () => {
    // 搜索列表
    dispatch(fetchLists({ search_phrase: initValue }));
  };

  useEffect(() => {
    const value = searchKey ? searchKey.replace(/\+/g, ' ') : '';
    if (value) {
      dispatch(onSearchChange(value));
      dispatch(fetchLists({ search_phrase: value }));
    }
  }, [searchKey, dispatch]);

  let content;
  if (status === 'loading' || status === 'idle') {
    content = new Array(4).fill(0).map((v, i) => (
      <Grid item lg={3} xs={12} sm={6} key={i}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="rectangular" height={100} />
      </Grid>
    ));
  } else if (status === 'succeeded') {
    content = dataList.map((data, index) => {
      const xData = data.search_msv.map((v) => v.date);
      const seriesData = data.search_msv.map((v) => v.sv);
      return (
        <Grid item lg={3} xs={12} sm={6} key={index}>
          <Paper sx={{ height: '200px' }}>
            <TrendChart
              title={data.name}
              xData={xData}
              seriesData={seriesData}
            />
          </Paper>
        </Grid>
      );
    });
  }

  return (
    <main>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap>
            <Link href="/" underline="none" sx={{ color: 'black' }}>
              <span style={{ fontWeight: 600 }}>Best</span>Search
            </Link>
          </Typography>
          <Grid sx={{ flexGrow: 1, display: 'flex', ml: 1, height: '34px' }}>
            <InputBase
              sx={{
                ml: 1,
                flex: '1 1 auto',
                border: '1px solid #ccc',
                padding: '0 8px',
              }}
              value={initValue}
              onChange={(e) => {
                dispatch(onSearchChange(e.target.value || ''));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // 回车键搜索
                  handleClick();
                }
              }}
              aria-label="Search for new products in 961K stores"
              placeholder="Search for new products in 961K stores"
            />

            <IconButton
              type="button"
              sx={{ p: '10px', mr: 1 }}
              aria-label="search"
              onClick={handleClick}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography sx={{ m: '40px 0' }}>Related product trends</Typography>
        <Grid container spacing={3}>
          {content}
        </Grid>
      </Container>
    </main>
  );
};

export default SearchPage;
