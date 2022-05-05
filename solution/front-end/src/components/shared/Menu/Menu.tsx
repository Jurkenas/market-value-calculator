import React, { useEffect, useState } from 'react';
import { Menu as AntMenu, MenuProps as AntMenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { BrowserHistory } from 'history';

export type MenuItem = {
  label: string;
  path: string;
};

interface MenuProps extends AntMenuProps {
  menuItems: MenuItem[];
  history: BrowserHistory;
}

function Menu({ menuItems = [], history, ...rest }: MenuProps) {
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    setPath(history.location.pathname);
  }, [history]);

  return (
    <AntMenu {...rest} selectedKeys={[path]}>
      {menuItems.map((item) => (
        <AntMenu.Item key={item.path}>
          <Link to={`${item.path}`} onClick={() => setPath(item.path)}>
            {item.label}
          </Link>
        </AntMenu.Item>
      ))}
    </AntMenu>
  );
}

export default Menu;
