import "./Avatar.scss"


export default function Avatar({ src }: { src: string }) {

    return (
        <div className="avatar">
            <img src={src} alt="uder-thumbnail" />
        </div>
    )
}
