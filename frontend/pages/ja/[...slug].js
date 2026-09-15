export { default } from '../404';

export function getServerSideProps({ res }) {
  res.statusCode = 404;
  return { props: {} };
}
