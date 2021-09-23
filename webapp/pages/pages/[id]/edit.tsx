import {useRouter} from "next/router";
import {createPage, getPage, updatePage} from "../_data";
import {unArray, useAsyncCallback} from "../../_util";
import {useState} from "react";

export default function Page() {
  const router = useRouter();
  const id = unArray(router.query.id || "missing-id");
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
    {page && <div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        await updatePage({id, data: {title, content}});
        await router.push(`/pages/${id}`);
      }}>
        <label htmlFor={"title"}>Title</label>
        <input name={"title"} className={"title"} onChange={e => setTitle(e.target.value)} value={title}/>
        <label htmlFor={"content"}>Content</label>
        <textarea onChange={e => setContent(e.target.value)} value={content}/>
        <button>Save</button>
      </form>
    </div>}
  </div>;
}