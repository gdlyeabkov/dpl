<template>
    <div class="footer">
        <div class="footerTop">
            <div class="footerTopColumn">
                <span class="footerTopColumnItemHeader footerTopColumnItem">
                    Why Go
                </span>
                <span class="footerTopColumnItem">
                    Use Cases
                </span>
                <span class="footerTopColumnItem">
                    Case Studies
                </span>
            </div>
            <div class="footerTopColumn">
                <span class="footerTopColumnItemHeader footerTopColumnItem">
                    Get Started
                </span>
                <span class="footerTopColumnItem">
                    Playground
                </span>
                <span class="footerTopColumnItem">
                    Tour
                </span>
                <span class="footerTopColumnItem">
                    Stack Overflow
                </span>
                <span class="footerTopColumnItem">
                    Help
                </span>
            </div>
            <div class="footerTopColumn">
                <span class="footerTopColumnItemHeader footerTopColumnItem">
                    Packages
                </span>
                <span class="footerTopColumnItem">
                    Standard Library
                </span>
            </div>
            <div class="footerTopColumn">
                <span class="footerTopColumnItemHeader footerTopColumnItem">
                    About
                </span>
                <span class="footerTopColumnItem">
                    Download
                </span>
                <span class="footerTopColumnItem">
                    Blog
                </span>
                <span class="footerTopColumnItem">
                    Issue Tracker
                </span>
                <span class="footerTopColumnItem">
                    Release Notes
                </span>
                <span class="footerTopColumnItem">
                    Brand Guidelines
                </span>
                <span class="footerTopColumnItem">
                    Code of Conduct
                </span>
            </div>
            <div class="footerTopColumn">
                <span class="footerTopColumnItemHeader footerTopColumnItem">
                    Connect
                </span>
                <span class="footerTopColumnItem">
                    Twitter
                </span>
                <span class="footerTopColumnItem">
                    GitHub
                </span>
                <span class="footerTopColumnItem">
                    Slack
                </span>
                <span class="footerTopColumnItem">
                    r/golang
                </span>
                <span class="footerTopColumnItem">
                    Meetup
                </span>
                <span class="footerTopColumnItem">
                    Golang Weekly
                </span>
            </div>
            
        </div>
        <div class="footerBottom">
            <div class="footerBottomContainer">
                <img class="langLogo" src="https://go.dev/images/gophers/pilot-bust.svg" alt="" width="85px" />
                <span class="footerBottomItem">
                    Copyright
                </span>
                <span class="footerBottomItem">
                    Terms of Service
                </span>
                <span class="footerBottomItem">
                    Privacy Policy
                </span>
                <span class="footerBottomItem">
                    Report an Issue
                </span>
            </div>
            <img src="https://go.dev/images/google-white.png" alt="" width="135px" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>
    
    .footer {
        background-color: rgb(0, 50, 100);
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 350px;
    }

    .footerTop {
        height: 275px;
        width: 100%;
        box-sizing: border-box;
        padding: 25px;
        display: flex;
        justify-content: space-between;
    }

    .footerBottom {
        height: 75px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        box-sizing: border-box;
        padding: 0px 35px;
        border-top: 1px solid rgb(255, 255, 255);
    }

    .footerBottomContainer {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footerBottomItem {
        color: rgb(255, 255, 255);
        margin: 0px 15px;
    }

    .footerTopColumn {
        display: flex;
        flex-direction: column;
    }

    .footerTopColumnItem {
        color: rgb(255, 255, 255);
        margin: 5px 15px;
    }
    
    .footerTopColumnItemHeader {
        font-size: 18px;
    }

    .langLogo {
        margin-top: 22px;
    }

</style>