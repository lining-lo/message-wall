<template>
    <div class="foot-bar">
        <div class="foot-bar-inner">
            <div class="foot-left">
                <div class="logo">
                    <img src="../../public/yksg.svg" alt="">
                    <div class="logo-name">一刻时光</div>
                </div>
                <p>一刻时光是本人独自开发的，为便于与用户交流的留言平台。</p>
                <p>用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅<br>可以用于交流，也是一场记录。</p>
                <p class="state"><span>声明</span><span>备案/许可证粤ICP备19012866号</span><span>网站备案/许可证粤ICP备19012866号-1</span>
                </p>
            </div>
            <div class="link">
                <p class="title">链接</p>
                <div class="link-iner">
                    <a href="https://github.com/lining-lo">一刻时光</a>
                    <a href="https://space.bilibili.com/1009154695?spm_id_from=333.1007.0.0">bilibili</a>
                </div>
            </div>
            <div class="foot-right">
                <p class="right-title">打赏</p>
                <div class="right-inner">
                    <div>
                        <img src="../assets/images/wx.png" alt="">
                        <p class="ds-title">微信支付</p>
                    </div>
                    <div>
                        <img src="../assets/images/zfb.png" alt="">
                        <p class="ds-title">支付宝支付</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

</script>
<style lang='less' scoped>
.foot-bar {
    width: 100%;
    background-color: #1e1d1e;
    padding: 20px;
    box-sizing: border-box;

    .foot-bar-inner {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        .foot-left {
            .logo {
                display: flex;
                align-items: center;
                padding-bottom: 20px;

                .logo-name {
                    font-size: 20px;
                    color: @gray-10;
                    font-weight: 600;
                    padding-left: 10px;
                }
            }

            .state {
                padding-top: 20px;

                span {
                    padding-right: 12px;
                }
            }
        }

        .link {
            .title {
                font-size: @size-16;
                padding-bottom: 12px;
            }

            a {
                color: rgba(255, 255, 255, 0.5);
                padding-right: 20px;
                font-size: @size-12;
            }
        }

        .foot-right {
            .right-title {
                font-size: @size-16;
                padding-bottom: 12px;
            }

            .right-inner {
                display: flex;

                img {
                    width: 100px;
                    padding-right: 40px;
                }

                .ds-title {
                    padding-top: 8px;
                }
            }
        }
    }


    p {
        color: #5a585a;
    }


}
</style>