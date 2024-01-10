import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material"
import { Icon } from '@iconify/react';

// Components
import ListMenu from "./components/ListMenu"
// Functions
import { menusByUserType } from './models/Functions';

interface Props {
    window?: () => Window;
}

const drawerWidth = 270;

const Dashboard = (props: Props) => {

    /* Page Title */
    const [pagetTitle, setPageTitle] = useState<string>('training');
    const { pathname } = useLocation();

    useEffect(() => {
        const listMenu = menusByUserType[1]
        const selectedMenu = listMenu.filter(menu => {
            if (menu.Path == pathname) {
                return menu
            }
        })
        setPageTitle(selectedMenu[0].Title)
    }, [pathname])

    /* Responsive Nav */
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);
    const container = window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Icon icon="pepicons-pop:menu" fontSize='26px' />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" textTransform={'capitalize'}>
                        {pagetTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {<ListMenu />}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {<ListMenu />}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
};


export default Dashboard