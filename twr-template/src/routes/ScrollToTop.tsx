import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history, children } :any) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, [history]);

  return <>{children}</>;
}

export default withRouter(ScrollToTop);