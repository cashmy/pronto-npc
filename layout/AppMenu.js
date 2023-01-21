import getConfig from 'next/config';
import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const model = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                    { label: 'Campaigns', icon: 'pi pi-fw pi-list', to: '/campaigns' }
                ]
        },
        {
            label: 'Generated',
            items: [
                { label: 'General', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                {
                    label: 'Big City Denizens',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Common Folk',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/bcd/commonfolk'
                        },
                        {
                            label: 'Nobles & Leaders',
                            icon: 'pi pi-fw pi-dollar',
                            to: '/bcd/noblesLeaders'
                        },
                        {
                            label: 'Lawkeepers & Lawbreakers',
                            icon: 'pi pi-fw pi-lock',
                            to: '/bcd/lawkeepersLawbreakers'
                        },
                        {
                            label: 'Oddballs & Outskirts',
                            icon: 'pi pi-fw pi-exclamation-circle',
                            to: '/bcd/oddballsOutskirts'
                        },
                        {
                            label: 'Random',
                            icon: 'pi pi-fw pi-bolt',
                            to: '/bcd/random'
                        }
                    ]
                },                
                {
                    label: 'Small Town Tenants',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Common Folk',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/stt/commonfolk'
                        },
                        {
                            label: 'Nobles & Leaders',
                            icon: 'pi pi-fw pi-dollar',
                            to: '/stt/noblesLeaders'
                        },
                        {
                            label: 'Lawkeepers & Lawbreakers',
                            icon: 'pi pi-fw pi-lock',
                            to: '/stt/lawkeepersLawbreakers'
                        },
                        {
                            label: 'Oddballs & Outskirts',
                            icon: 'pi pi-fw pi-exclamation-circle',
                            to: '/stt/oddballsOutskirts'
                        },
                        {
                            label: 'Random',
                            icon: 'pi pi-fw pi-bolt',
                            to: '/stt/random'
                        }
                    ]
                },
                {
                    label: 'Outskirts & Outposts',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Common Folk',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/ono/commonfolk'
                        },
                        {
                            label: 'Nobles & Leaders',
                            icon: 'pi pi-fw pi-dollar',
                            to: '/stt/noblesLeaders'
                        },
                        {
                            label: 'Lawkeepers & Lawbreakers',
                            icon: 'pi pi-fw pi-lock',
                            to: '/ono/lawkeepersLawbreakers'
                        },
                        {
                            label: 'Oddballs & Outskirts',
                            icon: 'pi pi-fw pi-exclamation-circle',
                            to: '/ono/oddballsOutskirts'
                        },
                        {
                            label: 'Random',
                            icon: 'pi pi-fw pi-bolt',
                            to: '/ono/random'
                        }
                    ]
                },
                {
                    label: 'Underdwellers',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Common Folk',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/und/commonfolk'
                        },
                        {
                            label: 'Nobles & Leaders',
                            icon: 'pi pi-fw pi-dollar',
                            to: '/und/noblesLeaders'
                        },
                        {
                            label: 'Lawkeepers & Lawbreakers',
                            icon: 'pi pi-fw pi-lock',
                            to: '/und/lawkeepersLawbreakers'
                        },
                        {
                            label: 'Oddballs & Outskirts',
                            icon: 'pi pi-fw pi-exclamation-circle',
                            to: '/und/oddballsOutskirts'
                        },
                        {
                            label: 'Random',
                            icon: 'pi pi-fw pi-bolt',
                            to: '/und/random'
                        }
                    ]
                },
 
            ]
        },
        {
            label: 'Admin',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Landing',
                    icon: 'pi pi-fw pi-globe',
                    to: '/landing'
                },
                {
                    label: 'Auth',
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Login',
                            icon: 'pi pi-fw pi-sign-in',
                            to: '/auth/login'
                        },
                        {
                            label: 'Error',
                            icon: 'pi pi-fw pi-times-circle',
                            to: '/auth/error'
                        },
                        {
                            label: 'Access Denied',
                            icon: 'pi pi-fw pi-lock',
                            to: '/auth/access'
                        }
                    ]
                },
                {
                    label: 'Crud',
                    icon: 'pi pi-fw pi-pencil',
                    to: '/pages/crud'
                }
            ]
        },
        {
            label: 'Get Started',
            items: [
                {
                    label: 'Documentation',
                    icon: 'pi pi-fw pi-question',
                    to: '/documentation'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link legacyBehavior href="https://www.primefaces.org/primeblocks-react" passHref>
                    <a target="_blank" style={{ cursor: 'pointer' }}>
                        <img alt="Prime Blocks" className="w-full mt-3" src={`${contextPath}/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                    </a>
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
