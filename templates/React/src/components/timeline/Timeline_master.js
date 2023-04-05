import React, {useEffect} from "react";
import TimelineCard from "./timelineCard";
import InfiniteScroll from "react-infinite-scroll-component";
import {CircularProgress} from "@mui/material";
import {FetchFeed} from "../../features/timeline/FeedFetch";
const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};
import {connect} from "react-redux";
import UpperHoc from "../../CommonFunctions/UpperCLouser/CustomHoc";
import {selectError, selectStatus, SuccessSelector} from "../../features/timeline/Timelineslicer";
import Empty_feed_component from "./empty_feed_component";
import ErrorBoundary from "../../CommonFunctions/Error_controlReact/ErrorBoundary";
import {logdata} from "../../CommonFunctions/Logger/Logevents";
import { withRouter } from "react-router";

class Timeline_master_component extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            posts:[],
            hasMore:true,
            items:[],fetch:false,updated:false,
        }
        this.fetchMoreData=this.fetchMoreData.bind(this)
        this.update_array=this.update_array.bind(this)
    }
    componentDidMount() {
        console.log("helooo")
        logdata("Timeline_master_component","info",`Timeline_master_component initated`)
        if(this.props.match.params.pkId !== undefined && typeof(this.props.match.params.pkId) !== "number")
        {
            console.log(this.props.match.params.pkId)
            this.props.FetchFeed(this.props.match.params.pkId)
        }
        else
        {
            this.props.FetchFeed(false)
        }

        this.setState({fetch:true})
    }

    fetchMoreData () {
        if (this.state.items.length >= this.state.posts.length) {
            this.setState({hasMore: false });
            return;
        }

        setTimeout(() => {
            this.setState({
                items: this.state.items.concat(this.state.posts.slice(this.state.items.length,this.state.items.length+3))
            });
        }, 900);
    };

    update_array()
    {
        if(this.state.fetch && this.props.SuccessSelector.fetchComplele && !this.state.update && !this.props.selectError.error)
        {
            let aaa=[]
            logdata("Timeline_master_component","info",`update_array ${aaa}`)
            for(let i =0;i<this.props.selectResult.length;i++)
            {
                if(aaa.length <8)
                {
                    aaa.push(this.props.selectResult[i])
                }
                else
                {
                    break
                }
            }
            this.setState({update:true,posts:this.props.selectResult,items:aaa})
        }
    }


    render() {
        // console.log(this.state,
        //     this.props
        // )
        // console.log("master render")
        this.update_array()
        return <>
            {/*check for*/}
            {this.props.selectStatus === "loading" && <>
                <UpperHoc  Re={false}  Status={selectStatus} Error={selectError} Success={SuccessSelector}>
                    <div className="hero">
                    </div>
                </UpperHoc>
            </>
            }
            {this.props.selectStatus === "idle" && <>
                <div className="hero">
                    {this.state.posts.length === 0 ?<>
                    <ErrorBoundary component_name={"Empty_feed_component"}>
                        <Empty_feed_component />
                    </ErrorBoundary>
                    </>:<>
                    <ErrorBoundary component_name={"InfiniteScroll"}>
                        <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={this.state.hasMore}
                            loader={
                                <div style={{ textAlign: "center" }}>
                                    <CircularProgress color="success" />
                                </div>
                            }
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <p className="text-sm text-gray-600">
                                        © Copyright 2020 Placeit. All rights reserved.
                                    </p>
                                </p>
                            }
                        >
                            {this.state.items.map((i, index) => (
                                <ErrorBoundary component_name={"TimelineCard"}>
                                    <TimelineCard  data={i} key={index} Dashboard={this.props.Dashboard} />
                                </ErrorBoundary>
                            ))}
                        </InfiniteScroll>
                    </ErrorBoundary>
                    </>}
                </div>
                <div className="h-2 w-full">
                </div>
            </>
            }
        </>;
    }
}

function mapStateToProps(state) {
    return {
        SuccessSelector:{Success: state.Feed.Success, Success_msg: state.Feed.SuccessMsg,fetchComplele:state.Feed.fetchComplele},
        selectResult: state.Feed.data,
        selectError: {error: state.Feed.error, error_msg: state.Feed.error_msg},
        selectStatus:state.Feed.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchFeed: (id) => dispatch(FetchFeed(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Timeline_master_component))
