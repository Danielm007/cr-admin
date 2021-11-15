import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";

import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Link href="/categories">
        <a>Categorías</a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link href="/add-category">
        <a>Agregar Categoría</a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link href="/products">
        <a>Productos</a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <Link href="/add-product">
        <a>Agregar Productos</a>
      </Link>
    </Menu.Item>
    <Menu.Divider />
  </Menu>
);

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <div>
          <Link href="/">
            <a>
              <Image src="/cr-logo.svg" width="200" height="100" alt="logo" />
            </a>
          </Link>
        </div>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            Menu <DownOutlined />
          </a>
        </Dropdown>
      </nav>
    </header>
  );
};
