<template>
    <div class="header">
        <img src="https://go.dev/images/go-logo-white.svg" alt="" width="85px" />
        <div class="headerBlock">
            <span class="headerBlockItem">
                Why Go
            </span>
            <span class="headerBlockItem">
                Get Started
            </span>
            <span class="headerBlockItem">
                Docs
            </span>
            <span class="headerBlockItem">
                Packages
            </span>
            <span class="headerBlockItem">
                Play
            </span>
            <span class="headerBlockItem">
                Blog
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
    
    .header {
        background-color: rgb(0, 150, 200);
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0px 35px;
    }

    .headerBlockItem {
        margin: 0px 15px;
        color: rgb(255, 255, 255);
    }

</style>