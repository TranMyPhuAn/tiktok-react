import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
  HomeIcon,
  HomeActiveIcon,
  UserGroupIcon,
  UserGroupActiveIcon,
  LiveIcon,
  LiveActiveIcon
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import { useEffect, useState } from 'react';

import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Sidebar() {
  const [suggestedUsers, setSuggestedUser] = useState([]);

  useEffect(() => {
    userService
      .getSuggested({ page: 1, perPage: 5 })
      .then((data) => {
        setSuggestedUser(data);
      })
      .catch((error) => {
        throw new Error('Invalide');
      });
  }, []);

  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem title='For You' to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem
          title='Following'
          to={config.routes.following}
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupActiveIcon />}
        />
        <MenuItem title='LIVE' to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
      </Menu>

      <SuggestedAccounts label='Suggested accounts' data={suggestedUsers} />
      <SuggestedAccounts label='Following accounts' />
    </aside>
  );
}

export default Sidebar;
