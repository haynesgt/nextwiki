import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {getPages} from "./pages/_data";
import {useAsyncCallback} from "./_util";

const Home: NextPage = () => {
  const {data: pages, error: pagesError} = useAsyncCallback([], getPages, []);
  return <>
    {
      pagesError && <div>{pagesError.message}</div>
    }
    {
      pages.map(({id, data: {title, content}}) =>
        <div key={id} className={styles.pageSummary}>
          <b>
            <a href={`pages/${id}`} className={"clickable-text"}>
              {title}
            </a>
          </b>{' - '}
          <span className={styles.edit}>
            <a className={"link"} href={`/pages/${id}/edit`}>Edit</a>
          </span>
          {content}
        </div>
      )
    }
  </>;
}

export default Home
export {unArray} from "./_util";