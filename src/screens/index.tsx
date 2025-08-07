import dynamic from 'next/dynamic';
import Loading from '../components/loading';

const Home = dynamic(() => import('./home'), {
  loading: () => <Loading />,
});

const Challenge = dynamic(() => import('./challenge'), {
  loading: () => <Loading />,
});

const Note = dynamic(() => import('./note'), {
  loading: () => {
    return <Loading />;
  },
});

export { Challenge, Home, Note };
