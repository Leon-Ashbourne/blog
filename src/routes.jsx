import BlogEditor from './components/editor';
import App from './App';
import IsAuthenticated from './components/authenticate';
import ErrorPage from './components/error/serverError';
import SigninForm from './components/login';
import { Profile } from './components/profile';

const routes = [
    {
        path: '/',
        Component: App,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                Component: IsAuthenticated,
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        Component: Profile,
                    }
                ]
            },
            {
                path: '/Sign-in',
                Component: SigninForm,
                errorElement: <ErrorPage />,
            },
            {
                path: '/posts/:postid',
                Component: BlogEditor
            },
            {
                path: '/create',
                Component: BlogEditor
            }
        ]
    }
]

export default routes;