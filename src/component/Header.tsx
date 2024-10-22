'use client';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import {
  cartState,
  languageDropdown,
  userDetail,
} from '../recoil/atoms/recoilState';
import { useEffect, useState } from 'react';
import Header from './layouts/Header';
import LoginModal from './layouts/loginModal';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import React from 'react';
import { apiService } from '../config/axios/axios-interceptor';
import dynamic from 'next/dynamic';

const IconCart = dynamic(() => import('./IconCart'), {
  ssr: false,
});

export default function Headers() {
  const [isOpen, setIsOpen] = useRecoilState(languageDropdown);
  const isLanguageOpen = () => setIsOpen(!isOpen);
  const route = useRouter();
  const { t } = useTranslation();
  const companyName = apiService.getCompanyName();
  const [menuList, setMenuList] = useState([]);
  const [subMenuList, setSubMenuList] = useState([]);
  const [logo, setLogo] = useState('');

  const getMenuList = async () => {
    const companyId = localStorage.getItem('company_id');
    const response = await apiService.get(`config-menu/${companyId}`);
    const navbarValues = response?.data?.filter(
      (item) => item.sideBar === false
    );
    setMenuList(navbarValues);
    setSubMenuList(navbarValues[0]?.subMenus || []);
  };

  const getSubMenuList = async (subMenus) => {
    setSubMenuList(subMenus);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLogo(localStorage.getItem('logo'));
    }
    getMenuList();
  }, []);

  return (
    <nav className="w-full bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto h-16 px-4">
        <div>
          <Image
            width={80}
            height={50}
            src="/YMTInnovation.png"
            className="h-20 w-30 absolute cursor-pointer top-0"
            alt="Logo"
            style={{ height: '50px', width: '80px' }}
            onClick={() => route.push('/')}
          />
        </div>

        <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse h-full">
          <button
            data-collapse-toggle="navbar-language"
            type="button"
            className="inline-flex items-center p-2 w-10 h-16 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-language"
            aria-expanded="false"
          ></button>
          <Header />
          <LoginModal />
          <IconCart />
        </div>

        <div
          className="max-w-screen-xl items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-language"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <button
                onClick={() => {
                  route.push(`/${companyName}/products`);
                  localStorage.setItem('menu', 'home');
                }}
                className="block py-2 px-3 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0"
                aria-current="page"
              >
                Home
              </button>
            </li>
            {menuList?.map((t, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    getSubMenuList(t.subMenus);
                  }}
                  className="block py-2 px-3 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0"
                  aria-current="page"
                >
                  {t.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Second line of the header */}
      <div className="w-screen flex items-center mx-auto h-16 px-4 bg-primary">
        <Image
          width={90}
          height={60}
          src={logo}
          className="cursor-pointer mr-5"
          alt="Logo"
          style={{ height: '4rem', width: '90px' }}
          onClick={() => route.push('/')}
        />
        <div className="items-center overflow-auto no-scrollbar whitespace-nowrap w-3/4 md:flex md:w-auto md:order-1">
          {subMenuList?.map((t, i) => (
            <button
              key={i}
              onClick={() => {
                if (typeof localStorage !== 'undefined') {
                  localStorage.setItem('menu', t.name);
                }
                route.push(`/${companyName}/${t.name}/products`);
              }}
              className="h-full inline-block text-center text-white bg-blue-600 rounded md:text-white-700 md:p-0"
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
