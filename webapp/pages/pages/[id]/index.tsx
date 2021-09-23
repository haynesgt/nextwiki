import {useRouter} from "next/router";
import {getPage, getPages} from "../_data";
import {useAsyncCallback} from "../../_util";
import styles from "../../../styles/Home.module.css";

export default function Page() {
  const router = useRouter();
  const {id} = router.query;
  const {data: page, error: pageError} = useAsyncCallback(undefined, () => getPage(`${id}`), [id]);
  return <div>
    {pageError && <p>{`${pageError}`}</p>}
    {page ? <div>
      <span className={styles.edit}>
        <a className={"link"} href={`/pages/${id}/edit`}>Edit</a>
      </span>
      <h1>{page.data.title}</h1>
      <p>{page.data.content}</p>
    </div> : <p>The page is missing</p>}
  </div>;
}