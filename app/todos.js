/**
 * Created by wushuyi on 2015/8/3.
 */
import './styles/base.css!css';
import './styles/index.css!css';
import $ from 'jquery';
import AppView from './views/app';
import TodoRouter from './routers/router';

$(function(){
   new AppView();
   $('#init-style').remove();
});