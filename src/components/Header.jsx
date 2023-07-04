import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'List user', href: '/listusers', current: false },
]

function Header(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate()

    const [hideHeader, setHideHeader] = useState(false)

    useEffect(() => {
        if (window.location.pathname === '/login') {
            setHideHeader(true)
        }
    }, [])

    const handleLogout = () => {
        logout()
        navigate('/')
        toast.success('Logout Success')
    }
    return (
        <Disclosure as="nav" className='bg-gray-800 fixed top-0 left-0 right-0 z-50 shadow-xl'>
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-9xl sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <a href=""><img className="h-40 float-left" src="../src/assets/img/logo.png" alt="/" /></a>
                                <div className="hidden sm:ml-6 sm:block">
                                    {user && user.auth || window.location.pathname === '/' &&
                                        < div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={Header(
                                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white text-xl',
                                                        'rounded-md px-3 py-5 text-sm font-medium mt-11'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {user && user.email && <span className='text-white'>Welcome {user.email}</span>}
                                <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-8 w-8" aria-hidden="true" />
                                </button>
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="http://pluspng.com/img-png/user-png-icon-file-user-icon-black-01-png-311.png"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {user && user.auth === false ? <Menu.Item>
                                                {({ active }) => (
                                                    <Link Link to={'/login'}
                                                        href="#"
                                                        className={Header(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Login
                                                    </Link>
                                                )}
                                            </Menu.Item> : <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => handleLogout()}
                                                        href="#"
                                                        className={Header(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Log out
                                                    </a>
                                                )}
                                            </Menu.Item>}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={Header(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )
            }
        </Disclosure >
    )
}
