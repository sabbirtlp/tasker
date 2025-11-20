import BorderedStar from "../SvgIcons/borderedStar"
import YellowStar from "../SvgIcons/YellowStar"

export default function Task({ task, onEdit, onDelete, handleIsFavourite }) {

    const { title, description, priority, isFavourite, tags } = task;


    return (
        <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
            <td onClick={() => { handleIsFavourite(task) }}>{isFavourite ? <YellowStar></YellowStar> : <BorderedStar></BorderedStar>}</td>

            <td>{title}</td>
            <td>
                <div>
                    {description}
                </div>
            </td>
            <td>
                <ul className="flex justify-center gap-1.5 flex-wrap">
                    {tags.map(tag => <li key={tag}>
                        <span
                            className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#2F43F8BF] px-2.5 text-sm capitalize text-[#F4F5F6]">{tag}</span>
                    </li>)}


                </ul>
            </td>
            <td className="text-center">{priority}</td>
            <td>
                <div className="flex items-center justify-center space-x-3">
                    <button className="text-red-500" onClick={() => { onDelete(task) }}>Delete</button>
                    <button className="text-blue-500" onClick={() => { onEdit(task) }}>Edit</button>
                </div>
            </td>
        </tr>
    )
}
