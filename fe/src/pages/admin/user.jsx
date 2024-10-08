import { Helmet } from 'react-helmet-async';

import { UserView } from 'sections/admin-sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | LEARNIX </title>
      </Helmet>

      <UserView />
    </>
  );
}
