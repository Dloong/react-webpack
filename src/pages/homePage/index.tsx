import React from 'react';
import { Container, Box, Typography, CardActionArea, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import AppHeader from '../../components/common/AppHeader';
import PoListing from '../../assets/images/homePage/PoListing.png';
import Order from '../../assets/images/homePage/Order.png';
import Add from '../../assets/images/homePage/Add.png';
import Trust from '../../assets/images/homePage/Trust.png';
import { useStyles } from './HomePageStyle';
import PaymentNotification from './PaymentNotification';

// eslint-disable-next-line camelcase
const nav_list = [
    {
        route: '/po/list',
        img: PoListing,
        title: 'home.poListing',
    },
    {
        route: '/order/list',
        img: Order,
        title: 'home.orders',
        showDot: true,
    },
];

const StyledBadge = withStyles(() => ({
    badge: {
        right: -70,
        top: -8,
        padding: '0 4px',
    },
}))(Badge);

function HomeBottom() {
    const calsses = useStyles();

    const { t } = useTranslation();

    return (
        <Box width="100%">
            <Box display="flex" justifyContent="space-between">
                {nav_list.map((item) => {
                    return (
                        <CardActionArea key={item.title} className={calsses.home_bottom_btn_group}>
                            <StyledBadge color="error" badgeContent={1} />
                            <img src={item.img} width="35px" height="35px" alt="" />
                            <Typography component="div" className={calsses.home_bottom_btn_text}>
                                {t(item.title)}
                            </Typography>
                        </CardActionArea>
                    );
                })}
            </Box>
            <Box width="100%" mt={2}>
                <CardActionArea className={calsses.home_bottom_btn_group}>
                    <img src={Add} width="35px" height="35px" alt="" />
                    <Typography component="div" className={calsses.home_bottom_btn_text}>
                        {t('home.addPo')}{' '}
                    </Typography>
                </CardActionArea>
            </Box>
        </Box>
    );
}

const HadLogin = (props: any) => {
    const calsses = useStyles();
    const {number} = props;
    const { t } = useTranslation();
    return (
        <Box width="100%" fontWeight={500} fontSize={18}>
            <Button
                className={calsses.po_number_text}
                fullWidth
                variant="contained"
                color="secondary"
            >
                {t('home.onGoingPo')}
            </Button>
            <Box mt={2} fontSize={18}>
                <Typography variant="h5" align="center">
                    {number}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt={6}>
                <img width="100px" height="100px" src={Trust} alt="" />
            </Box>
        </Box>
    );
};

export default function Home(): React.ReactElement {
    const calsses = useStyles();
    const { t } = useTranslation();

    return (
        <div className={calsses.root}>
            <AppHeader
                backgroundColor="#FFD100"
                className={calsses.home_header}
                title={t('home.title')}
                showBack={false}
            />
            <PaymentNotification />

            <Container className={calsses.home_container} maxWidth="xl">
                <HadLogin number={12} />
                <HomeBottom />
            </Container>
        </div>
    );
}
