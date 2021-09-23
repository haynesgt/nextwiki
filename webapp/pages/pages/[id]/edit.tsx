import {useRouter} from "next/router";
import {getPage, getPages} from "../_data";
import {useAsyncCallback} from "../../_util";
import styles from "../../../styles/Home.module.css";
import {useEffect, useRef, useState} from "react";

export default function Page() {
  const router = useRouter();
  const {id} = router.query;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  const {data: page, error: pageError} = useAsyncCallback(undefined, async () => {
    const newPagePromise = getPage(`${id}`);
    const newPage = await newPagePromise;
    if (newPage) {
      if (!title) setTitle(newPage.data.title);
      if (!content) setContent(newPage.data.content);
    }
    return newPage;
  }, [id]);
  return <div>
    {pageError && <p>{`${pageError}`}</p>}
    {page ? <div>
      <form>
        <label htmlFor={"title"}>Title</label>
        <input name={"title"} className={"title"} onChange={e => setTitle(e.target.value)} value={title}/>
        <label htmlFor={"content"}>Content</label>
        <textarea onChange={e => setContent(e.target.value)} value={content}/>
        <button>Save</button>
      </form>
    </div> : <p>The page is missing</p>}
  </div>;
}