import Login from '../views/login';
import Main from '../views/main.js';
import User from '../views/user/user.js';
import Upload from '../views/upload/upload.js';
import Video from '../views/video/video.js';
import MenuSet from '../views/menuSet/menuSet.js';

import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/Main',
      element: <Main />,

      children: [
        { index: true, element: <User /> },
        {
          path: 'user',
          element: <User />,
        },
        {
          path: 'upload',
          element: <Upload />,
        },
        {
          path: 'video',
          element: <Video />,
        },
        {
          path: 'menuSet',
          element: <MenuSet />,
        },
      ],
    },
  ],
  {
    basename: '/subdir',
  }
);

export default router;
