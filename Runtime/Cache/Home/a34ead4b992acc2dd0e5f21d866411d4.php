<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en" class="no-js">
    <head>
        <meta charset="utf-8">
        <title>登录，注册</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!-- CSS -->
        <!-- <link rel="stylesheet" type="text/css" href="Public/static/css/assets/css/reset.css" /> -->
        <style>
            body {
                font-family: 'PT Sans', Helvetica, Arial, sans-serif;
                text-align: center;
                color: rgb(255, 255, 255);
                background: rgb(248, 248, 248);
            }
            .login{
                margin-left: 25%;
            }
            h1 {
                float: left;
                width: 25%;
                font-size: 30px;
                font-weight: 700;
                text-shadow: rgba(0, 0, 0, 0.2) 0px 1px 4px;
                cursor: pointer;
            }
            .page-container {
                margin: 120px auto 0px;
            }
            form {
                position: relative;
                width: 305px;
                text-align: center;
                margin: 15px auto 0px;
            }
            input {
                width: 270px;
                height: 42px;
                margin-top: 25px;
                box-shadow: rgba(0, 0, 0, 0.0980392) 0px 2px 3px 0px inset;
                font-family: 'PT Sans', Helvetica, Arial, sans-serif;
                font-size: 14px;
                color: #fff;
                text-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 2px;
                padding: 0px 15px;
                background: rgba(45, 45, 45, 0.14902);
                border-radius: 6px;
                border: 1px solid rgba(255, 255, 255, 0.14902);
                transition: all 0.2s;
            }

            button {
                cursor: pointer;
                width: 300px;
                height: 44px;
                margin-top: 25px;
                box-shadow: rgba(255, 255, 255, 0.247059) 0px 15px 30px 0px inset, rgba(0, 0, 0, 0.2) 0px 2px 7px 0px;
                font-family: 'PT Sans', Helvetica, Arial, sans-serif;
                font-size: 14px;
                font-weight: 700;
                color: #fff;
                text-shadow: rgba(0, 0, 0, 0.0980392) 0px 1px 2px;
                padding: 0px;
                background: rgb(239, 67, 0);
                border-radius: 6px;
                border: 1px solid rgb(255, 115, 14);
                transition: all 0.2s;
            }

        </style>
    </head>

    <body>

        <div class="page-container">
            
            <form action="" method="post">
                <h1 class="login">登录</h1>
                <h1 class="reset">注册</h1>
                <input type="text" name="username" class="username" placeholder="用户名">
                <input type="password" name="password" class="password" placeholder="密码">
                <button id="btn">登录</button>
            </form>
        </div>
    </body>
    <script type="text/javascript" src="Public/static/js/jquery.js"></script>
    <script>

        $(".login").on('click', function() {

            $("#btn").html("登录");
        });
        $(".reset").on('click', function() {

            $("#btn").html("注册");
        });
    </script>
</html>