import { setHomeSearch } from '@/store/homeSlice';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Grid,
  IconButton,
  InputBase,
  Link,
  Toolbar,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store/hooks';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  // 从state中获取value
  const value = useAppSelector((state) => state.home.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    const str = value.trim().replace(/\W/g, '+');
    // 跳转搜索页
    router.push(`/search/${str}`);
  };

  return (
    <section>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link href="/" underline="none" sx={{ color: 'black' }}>
              <span style={{ fontWeight: 600 }}>Best</span>Search
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Search Trends
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item></Grid>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                border: '1px solid #ccc',
                padding: '0 8px',
              }}
              value={value}
              onChange={(e) => {
                dispatch(setHomeSearch(e.target.value || ''));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // 回车键搜索
                  console.log('enter------------------');
                  handleClick();
                }
              }}
              aria-label="Search for new products in 961K stores"
              placeholder="Search for new products in 961K stores"
            />

            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={handleClick}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Box>
      </Container>
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return page;
};
