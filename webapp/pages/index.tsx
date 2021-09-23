import type {NextPage} from 'next'
import styles from '../styles/Home.module.css'
import {getPages} from "../lib/client/pages";
import {useAsyncCallback} from "../lib/util.ts/_util";

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
    {
      <a href={"/pages/create"} className={"button"}>New</a>
    }
  </>;
}

export default Home
export {unArray} from "../lib/util.ts/_util";