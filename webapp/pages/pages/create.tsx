import {useRouter} from "next/router";
import {createPage, getPage, updatePage} from "./_data";
import {unArray, useAsyncCallback} from "../_util";
import {useState} from "react";

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("")
  return <div>
    <form onSubmit={async (e) => {
      e.preventDefault();
      const {id} = await createPage({title, content})
      await router.push(`/pages/${id}`);
    }}>
      <label htmlFor={"title"}>Title</label>
      <input name={"title"} className={"title"} onChange={e => setTitle(e.target.value)} value={title}/>
      <label htmlFor={"content"}>Content</label>
      <textarea onChange={e => setContent(e.target.value)} value={content}/>
      <button>Save</button>
    </form>
  </div>;
}