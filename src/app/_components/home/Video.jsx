import Link from "next/link";

const  Video = () => {
    return (
        <>
          <section className="s-video">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="video-main">

                            <Link href="https://www.youtube.com/watch?v=eI_LjETc_Ak" className="popup-youtube wrap-video">
                                <i className="fa fa-play"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Video;