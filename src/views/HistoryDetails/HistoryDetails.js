/* eslint-disable react/prop-types */
/*global google*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  InputLabel,
  FormControl,
  TextField,
  Avatar,
  Chip,
  SvgIcon
} from '@material-ui/core';
import moment from 'moment';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import NumberFormat from 'react-number-format';
import DB from '../../util/firebaseinit';
//import CircularProgress from '@material-ui/core/CircularProgress';
//import firebase from "firebase/app";

function BicycleIcon(props) {
  return (
    <SvgIcon {...props} width="512" height="512" viewBox="0 0 512 512">
      <path d="m24 88h144v144h-144z" fill="#e74444"/><path d="m24 88h144a0 0 0 0 1 0 0 32 32 0 0 1 -32 32h-80a32 32 0 0 1 -32-32 0 0 0 0 1 0 0z" fill="#ea8333"/><path d="m56 192h80v40h-80z" fill="#ea8333"/><path d="m56 168h80v32h-80z" fill="#ea8333"/><circle cx="112" cy="344" fill="#c2c5c6" r="80"/><circle cx="408" cy="344" fill="#c2c5c6" r="80"/><g fill="#6a7073"><circle cx="112" cy="344" r="16"/><circle cx="256" cy="344" r="32"/><path d="m168 168h48a32 32 0 0 1 32 32 0 0 0 0 1 0 0h-80a0 0 0 0 1 0 0v-32a0 0 0 0 1 0 0z"/><circle cx="408" cy="344" r="16"/></g><path d="m72 344a40.045 40.045 0 0 1 40-40 8 8 0 0 0 0-16 56.063 56.063 0 0 0 -56 56 8 8 0 0 0 16 0z"/><path d="m98.666 381.726a40.323 40.323 0 0 1 -20-15.613 8 8 0 1 0 -13.324 8.858 56.424 56.424 0 0 0 28 21.84 8 8 0 1 0 5.332-15.085z"/><path d="m408 256a87.768 87.768 0 0 0 -23.725 3.252l-29.59-77.677 48.615-12.153c.559 3.683.448 10.048-2.886 20.048a8 8 0 0 0 15.18 5.06c9.1-27.307-.014-38.267-1.933-40.187a8 8 0 0 0 -7.6-2.1l-64 16a8 8 0 0 0 -5.536 10.609l7.327 19.232-123.052 32.38-8.984-22.464h36.184a8 8 0 0 0 8-8 40.045 40.045 0 0 0 -40-40h-40v-72a8 8 0 0 0 -8-8h-144a8 8 0 0 0 -8 8v144a8 8 0 0 0 8 8h140l17.437 23.249-13.156 13.151a87.966 87.966 0 1 0 31.352 75.6h17.172a40.119 40.119 0 0 0 31.195 31.2v16.8h-8a8 8 0 0 0 0 16h32a8 8 0 0 0 0-16h-8v-16.8a39.965 39.965 0 0 0 24.623-62.3l72.538-77.377 8.17 21.445a87.977 87.977 0 1 0 38.669-8.968zm-149.112 73.223-3.541-9.206c.218-.006.434-.017.653-.017a23.859 23.859 0 0 1 9.635 2.026zm-14.536 6.777h-10.976a24.077 24.077 0 0 1 7.041-10.23zm-27.547 0h-17.172a87.609 87.609 0 0 0 -20.033-48.281l33.357-33.357 21.52 55.952a40.1 40.1 0 0 0 -17.672 25.686zm-82.181 0a24.147 24.147 0 0 0 -.969-2.341l34.565-34.565a71.658 71.658 0 0 1 15.325 36.906zm-14.624 8a8 8 0 1 1 -8-8 8.009 8.009 0 0 1 8 8zm96-168a24.042 24.042 0 0 1 22.629 16h-62.629v-16zm-57.376-80a24.039 24.039 0 0 1 -22.624 16h-80a24.039 24.039 0 0 1 -22.624-16zm-30.624 96h-64v-16h64zm-64 16h64v16h-64zm80 16v-56a8 8 0 0 0 -8-8h-80a8 8 0 0 0 -8 8v56h-16v-104.022a39.788 39.788 0 0 0 24 8.022h80a39.788 39.788 0 0 0 24-8.022v104.022zm32 5.333v-21.333h18.584l12.029 30.073-13.747 13.747zm-64 186.667a72 72 0 1 1 44.906-128.22l-34.565 34.565a24 24 0 1 0 12.283 29.655h48.921a72.1 72.1 0 0 1 -71.545 64zm121.376-64h14.624v14.624a24.119 24.119 0 0 1 -14.624-14.624zm46.624-8a24.039 24.039 0 0 1 -16 22.624v-19.461l13.305-14.192a23.843 23.843 0 0 1 2.695 11.029zm-3.043-34.052a39.825 39.825 0 0 0 -27.557-5.394l-22.727-59.091 122.906-32.346 5.246 13.769zm131.043 106.052a71.979 71.979 0 0 1 -32.938-135.991l5.738 15.064a56.035 56.035 0 0 0 -28.8 48.927 8 8 0 0 0 16 0 40 40 0 0 1 18.58-33.755l5.9 15.474a23.982 23.982 0 1 0 15.52-5.719c-.194 0-.385.01-.577.015l-5.9-15.483a40.068 40.068 0 0 1 6.477-.532 8 8 0 0 0 0-16 55.915 55.915 0 0 0 -12.252 1.367l-5.748-15.088a72 72 0 1 1 18 141.721zm0-80a8 8 0 1 1 -8 8 8.009 8.009 0 0 1 8-8z"/><path d="m394.666 381.726a40.323 40.323 0 0 1 -20-15.613 8 8 0 1 0 -13.324 8.858 56.424 56.424 0 0 0 28 21.84 8 8 0 1 0 5.332-15.085z"/>
    </SvgIcon>
  );
}

function MotorbikeIcon(props) {
  return (
    <SvgIcon {...props} width="470pt" height="470pt" viewBox="0 -70 470.272 470">
      <path d="m268.136719 36.640625h56v18.503906h-56zm0 0" fill="#82d9ff"/><path d="m324.136719 59.136719h-56c-2.207031 0-4-1.792969-4-4v-18.503907c0-2.207031 1.792969-4 4-4h56c2.207031 0 4 1.792969 4 4v18.503907c0 2.214843-1.792969 4-4 4zm-52-8h48v-10.503907h-48zm0 0" fill="#63312d"/><path d="m352.136719 63.136719s54.214843 35.078125 57.941406 138.207031v63.792969h-109.941406l21.832031-70.167969c7.183594-23.089844 10.839844-47.128906 10.839844-71.3125v-60.519531zm0 0" fill="#82d9ff"/><path d="m410.070312 269.136719h-109.933593c-1.273438 0-2.472657-.601563-3.214844-1.625-.761719-1.03125-.976563-2.351563-.601563-3.558594l21.832032-70.167969c7.070312-22.714844 10.65625-46.304687 10.65625-70.128906v-60.511719c0-2.207031 1.792968-4 4-4h19.328125c.773437 0 1.519531.222657 2.167969.640625 2.289062 1.480469 56.007812 37.40625 59.765624 141.421875v63.9375c0 2.207031-1.78125 3.992188-4 3.992188zm-104.496093-8h100.503906v-59.800781c-3.324219-92.128907-48.230469-129.015626-55.207031-134.199219h-14.054688v56.511719c0 24.625-3.703125 49.023437-11.015625 72.503906zm0 0" fill="#63312d"/><path d="m82 4.136719h118.136719v107h-118.136719zm0 0" fill="#f9dd9d"/><path d="m200.136719 115.136719h-118.136719c-2.207031 0-4-1.792969-4-4v-107c0-2.207031 1.792969-4 4-4h118.136719c2.207031 0 4 1.792969 4 4v107c0 2.214843-1.792969 4-4 4zm-114.136719-8h110.136719v-99h-110.136719zm0 0" fill="#63312d"/><path d="m50 4.136719h118.136719v107h-118.136719zm0 0" fill="#f9dd9d"/><path d="m66 20.136719h102.136719v-16h-118.136719v107h16zm0 0" fill="#ffeecf"/><path d="m168.136719 115.136719h-118.136719c-2.207031 0-4-1.792969-4-4v-107c0-2.207031 1.792969-4 4-4h118.136719c2.207031 0 4 1.792969 4 4v107c0 2.214843-1.792969 4-4 4zm-114.136719-8h110.136719v-99h-110.136719zm0 0" fill="#63312d"/><path d="m95.902344 4.136719h26.335937v35.664062h-26.335937zm0 0" fill="#f8f3f3"/><path d="m122.238281 43.808594h-26.335937c-2.207032 0-4-1.792969-4-4v-35.664063c0-2.207031 1.792968-4 4-4h26.335937c2.210938 0 4 1.792969 4 4v35.664063c0 2.207031-1.789062 4-4 4zm-22.335937-8h18.335937v-27.664063h-18.335937zm0 0" fill="#63312d"/><path d="m212 241.136719h130.464844v24h-130.464844zm0 0" fill="#82d9ff"/><path d="m342.472656 269.136719h-130.472656c-2.207031 0-4-1.792969-4-4v-24c0-2.207031 1.792969-4 4-4h130.472656c2.207032 0 4 1.792969 4 4v24c0 2.214843-1.792968 4-4 4zm-126.472656-8h122.472656v-16h-122.472656zm0 0" fill="#63312d"/><path d="m452.808594 274.472656c0 28.71875-23.28125 52-52 52s-52-23.28125-52-52 23.28125-52 52-52 52 23.28125 52 52zm0 0" fill="#52b8d9"/><path d="m423.921875 274.472656c0 12.765625-10.347656 23.113282-23.113281 23.113282s-23.113282-10.347657-23.113282-23.113282 10.347657-23.113281 23.113282-23.113281 23.113281 10.347656 23.113281 23.113281zm0 0" fill="#eee"/><path d="m160 274.472656c0 28.71875-23.28125 52-52 52s-52-23.28125-52-52 23.28125-52 52-52 52 23.28125 52 52zm0 0" fill="#52b8d9"/><path d="m131.113281 274.472656c0 12.765625-10.347656 23.113282-23.113281 23.113282s-23.113281-10.347657-23.113281-23.113282 10.347656-23.113281 23.113281-23.113281 23.113281 10.347656 23.113281 23.113281zm0 0" fill="#eee"/><g fill="#63312d"><path d="m400.808594 330.472656c-30.871094 0-56-25.128906-56-56s25.128906-56 56-56 56 25.128906 56 56-25.128906 56-56 56zm0-104c-26.472656 0-48 21.527344-48 48s21.527344 48 48 48 48-21.527344 48-48-21.527344-48-48-48zm0 0"/><path d="m400.808594 301.585938c-14.945313 0-27.113282-12.171876-27.113282-27.121094 0-14.945313 12.167969-27.113282 27.113282-27.113282 14.953125 0 27.121094 12.167969 27.121094 27.113282 0 14.960937-12.167969 27.121094-27.121094 27.121094zm0-46.226563c-10.535156 0-19.113282 8.570313-19.113282 19.113281 0 10.542969 8.570313 19.121094 19.113282 19.121094 10.542968 0 19.121094-8.578125 19.121094-19.121094 0-10.542968-8.585938-19.113281-19.121094-19.113281zm0 0"/><path d="m108 330.472656c-30.871094 0-56-25.128906-56-56s25.128906-56 56-56 56 25.128906 56 56-25.121094 56-56 56zm0-104c-26.472656 0-48 21.527344-48 48s21.527344 48 48 48 48-21.527344 48-48-21.527344-48-48-48zm0 0"/><path d="m108 301.585938c-14.945312 0-27.113281-12.171876-27.113281-27.121094 0-14.945313 12.167969-27.113282 27.113281-27.113282s27.113281 12.167969 27.113281 27.113282c0 14.960937-12.160156 27.121094-27.113281 27.121094zm0-46.226563c-10.535156 0-19.113281 8.570313-19.113281 19.113281 0 10.542969 8.570312 19.121094 19.113281 19.121094s19.113281-8.578125 19.113281-19.121094c0-10.542968-8.570312-19.113281-19.113281-19.113281zm0 0"/></g><path d="m212 265.136719h-200c-4.414062 0-8-3.585938-8-8v-28c0-44.183594 35.816406-80 80-80h80c26.511719 0 48 21.488281 48 48zm0 0" fill="#52b8d9"/><path d="m212 269.136719h-200c-6.617188 0-12-5.382813-12-12v-28c0-46.320313 37.679688-84 84-84h80c28.671875 0 52 23.328125 52 52v68c0 2.214843-1.785156 4-4 4zm-128-116c-41.902344 0-76 34.09375-76 76v28c0 2.199219 1.800781 4 4 4h196v-64c0-24.257813-19.742188-44-44-44zm0 0" fill="#63312d"/><path d="m180 265.136719h-144v-20c0-22.089844 17.910156-40 40-40h64c22.089844 0 40 17.910156 40 40zm0 0" fill="#82d9ff"/><path d="m180 269.136719h-144c-2.207031 0-4-1.792969-4-4v-20c0-24.257813 19.742188-44 44-44h64c24.257812 0 44 19.742187 44 44v20c0 2.214843-1.785156 4-4 4zm-140-8h136v-16c0-19.847657-16.152344-36-36-36h-64c-19.847656 0-36 16.152343-36 36zm0 0" fill="#63312d"/><path d="m466.273438 265.136719h-133.464844c0-35.550781 28.816406-64.367188 64.367187-64.367188h4.71875c35.554688 0 64.378907 28.816407 64.378907 64.367188zm0 0" fill="#82d9ff"/><path d="m466.273438 269.136719h-133.464844c-2.207032 0-4-1.792969-4-4 0-37.703125 30.671875-68.375 68.375-68.375h4.71875c37.699218 0 68.371094 30.671875 68.371094 68.375 0 2.214843-1.792969 4-4 4zm-129.328126-8h125.191407c-2.066407-31.441407-28.289063-56.375-60.234375-56.375h-4.71875c-31.945313.007812-58.183594 24.941406-60.238282 56.375zm0 0" fill="#63312d"/><path d="m377.472656 62.472656h-48c-12.152344 0-22-9.847656-22-22s9.847656-22 22-22h48zm0 0" fill="#eee"/><path d="m377.472656 66.472656h-48c-14.335937 0-26-11.664062-26-26 0-14.335937 11.664063-26 26-26h48c2.207032 0 4 1.792969 4 4v44c0 2.207032-1.792968 4-4 4zm-48-44c-9.921875 0-18 8.078125-18 18 0 9.917969 8.078125 18 18 18h44v-36zm0 0" fill="#63312d"/><path d="m353.640625 18.472656h8v44h-8zm0 0" fill="#63312d"/><path d="m193 149.136719h-135.863281c-10.496094 0-19-8.503907-19-19 0-10.496094 8.503906-19 19-19h135.863281c10.496094 0 19 8.503906 19 19 0 10.496093-8.503906 19-19 19zm0 0" fill="#eee"/><path d="m193 153.136719h-135.863281c-12.679688 0-23-10.320313-23-23 0-12.679688 10.320312-23 23-23h135.863281c12.679688 0 23 10.320312 23 23 0 12.679687-10.320312 23-23 23zm-135.863281-38c-8.273438 0-15 6.726562-15 15 0 8.269531 6.726562 15 15 15h135.863281c8.273438 0 15-6.730469 15-15 0-8.273438-6.726562-15-15-15zm0 0" fill="#63312d"/>
    </SvgIcon>
  );
}

function CarIcon(props) {
  return (
    <SvgIcon {...props} width="512" height="512" viewBox="0 0 64 64">
      <g>
        <path d="m3 47v-20a4 4 0 0 1 4-4h33a6.258 6.258 0 0 1 5 2l7 7 9 3v12z" fill="#dd3e46"/><path d="m5 34h-2v8h4v-6a2 2 0 0 0 -2-2z" fill="#fcf05a"/><path d="m40 27h-8v9h16v-2l-6-6a2.856 2.856 0 0 0 -2-1z" fill="#cdeef6"/><path d="m57 42h4v5h-4z" fill="#394d5c"/><path d="m3 42h4v5h-4z" fill="#394d5c"/><path d="m55 38h6v-3l-6-2z" fill="#fcf05a"/><path d="m7 36h5v2h-5z" fill="#8ec13f"/><path d="m14 36h2v2h-2z" fill="#8ec13f"/><path d="m18 36h2v2h-2z" fill="#8ec13f"/><path d="m28 33h-18l-3-6h21z" fill="#cdeef6"/><path d="m22 36h7v2h-7z" fill="#8ec13f"/><path d="m23 42h16v2h-16z" fill="#f1997e"/><path d="m9 19h28v4h-28z" fill="#2d75bb"/><path d="m15 11h16a4 4 0 0 1 4 4v4a0 0 0 0 1 0 0h-24a0 0 0 0 1 0 0v-4a4 4 0 0 1 4-4z" fill="#50b4f8"/><g fill="#fcf05a"><path d="m28 14h4v2h-4z"/><path d="m14 14h4v2h-4z"/><path d="m20 14h6v2h-6z"/></g><circle cx="15" cy="47" fill="#394d5c" r="6"/><circle cx="15" cy="47" fill="#fcf05a" r="2"/><circle cx="47" cy="47" fill="#394d5c" r="6"/><circle cx="47" cy="47" fill="#fcf05a" r="2"/><path d="m15 44a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z"/><path d="m47 44a3 3 0 1 0 3 3 3 3 0 0 0 -3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z"/><path d="m61.316 34.052-8.776-2.926-6.833-6.833a7.225 7.225 0 0 0 -5.707-2.293h-2v-3a1 1 0 0 0 -1-1h-1v-3a5.006 5.006 0 0 0 -5-5h-16a5.006 5.006 0 0 0 -5 5v3h-1a1 1 0 0 0 -1 1v3h-1a5.006 5.006 0 0 0 -5 5v20a1 1 0 0 0 1 1h5.08a6.991 6.991 0 0 0 13.84 0h18.16a6.991 6.991 0 0 0 13.84 0h7.08a1 1 0 0 0 1-1v-12a1 1 0 0 0 -.684-.948zm-49.316-19.052a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v3h-22zm-2 5h26v2h-26zm-4 26h-2v-3h2zm0-5h-2v-6h1a1 1 0 0 1 1 1zm9 11a5 5 0 1 1 5-5 5.006 5.006 0 0 1 -5 5zm32 0a5 5 0 1 1 5-5 5.006 5.006 0 0 1 -5 5zm13-6h-2v-3h2zm0-5h-3a1 1 0 0 0 -1 1v4h-2.08a6.991 6.991 0 0 0 -13.84 0h-18.16a6.991 6.991 0 0 0 -13.84 0h-.08v-8h4v-2h-4a3 3 0 0 0 -3-3h-1v-6a3 3 0 0 1 3-3h33a5.246 5.246 0 0 1 4.293 1.707l7 7a1.011 1.011 0 0 0 .391.241l2.316.772v4.28a1 1 0 0 0 1 1h5zm0-4h-4v-2.613l4 1.334z"/><path d="m14 36h2v2h-2z"/><path d="m18 36h2v2h-2z"/><path d="m29 33v-6a1 1 0 0 0 -1-1h-21a1 1 0 0 0 -.895 1.447l3 6a1 1 0 0 0 .895.553h18a1 1 0 0 0 1-1zm-2-1h-16.382l-2-4h18.382z"/><path d="m22 36h7v2h-7z"/><path d="m23 42h16v2h-16z"/><path d="m42.707 27.293a3.791 3.791 0 0 0 -2.707-1.293h-8a1 1 0 0 0 -1 1v12h2v-2h2v2h2v-2h11a1 1 0 0 0 1-1v-2a1 1 0 0 0 -.293-.707zm4.293 7.707h-14v-7h7a1.893 1.893 0 0 1 1.293.707l5.707 5.707z"/><path d="m28 14h4v2h-4z"/><path d="m14 14h4v2h-4z"/><path d="m20 14h6v2h-6z"/>
      </g>
    </SvgIcon>
  );
}

function VanIcon(props) {
  return (
    <SvgIcon {...props} width="512" height="512" viewBox="0 0 512 512">
      <g>
        <g>
            <path d="m437.912 254.395-13.973-49.186c-3.755-13.218-15.827-22.338-29.568-22.338h-62.96v101.256 94h108.584 44.377c11.117 0 20.129-9.012 20.129-20.129v-63.511c0-6.16-4.012-11.603-9.897-13.425l-47.33-17.083c-4.541-1.406-8.063-5.012-9.362-9.584z" fill="#b9acac"/><path d="m494.603 281.062-20.103-7.256v54.191c0 11.117-9.012 20.129-20.129 20.129h-44.377-78.584v30h108.584 44.377c11.117 0 20.129-9.012 20.129-20.129v-63.511c0-6.159-4.012-11.602-9.897-13.424z" fill="#9e9797"/><path d="m363.485 246.388c0 9.755 7.908 17.663 17.663 17.663h66.326l-.201-.072c-4.541-1.406-8.063-5.012-9.362-9.584l-13.973-49.186c-3.755-13.218-15.827-22.338-29.568-22.338h-30.885z" fill="#f3eae6"/><path d="m331.41 118.651c0-19.126-15.504-34.63-34.63-34.63h-254.649c-19.126 0-34.63 15.505-34.63 34.63v121.39h117.36c27.983 0 54.24 13.525 70.487 36.309l72.579 101.778h63.484v-259.477z" fill="#f3eae6"/><path d="m7.5 240.041v120.115c0 9.925 8.046 17.971 17.971 17.971h242.455l-77.656-108.898c-13.061-18.315-34.168-29.188-56.663-29.188z" fill="#ffd15b"/><path d="m165.347 246.35c-16.248-22.783-42.507-36.309-70.49-36.309h-87.357v30h117.36c16.092 0 31.609 4.481 44.985 12.615z" fill="#efe2dd"/><path d="m301.129 84.302c.179 1.426.281 2.875.281 4.349v244.827c0 8.091-6.559 14.649-14.649 14.649h-40.228l21.393 30h63.484v-259.476c0-17.652-13.21-32.209-30.281-34.349z" fill="#efe2dd"/><path d="m7.5 348.127v12.029c0 9.925 8.046 17.971 17.971 17.971h242.455l-21.393-30z" fill="#ffc344"/><circle cx="119.689" cy="373.289" fill="#766e6e" r="54.691"/><ellipse cx="119.689" cy="373.288" fill="#cdbfba" rx="17.132" ry="17.132" transform="matrix(.23 -.973 .973 .23 -271.112 404.012)"/><circle cx="412.955" cy="373.289" fill="#766e6e" r="54.691"/><ellipse cx="412.955" cy="373.288" fill="#e1d3ce" rx="17.132" ry="17.132" transform="matrix(.707 -.707 .707 .707 -143.003 401.337)"/><path d="m141.998 174.832h-79.56c-4.191 0-7.589-3.398-7.589-7.589v-19.513c0-4.191 3.398-7.589 7.589-7.589h79.56c4.191 0 7.589 3.398 7.589 7.589v19.513c0 4.191-3.398 7.589-7.589 7.589z" fill="#ffd15b"/><path d="m395.759 182.87h-64.349v-48.706h40.85c12.978 0 23.498 10.521 23.498 23.498v25.208z" fill="#766e6e"/></g><g><path d="m119.689 348.657c-13.582 0-24.632 11.05-24.632 24.632s11.05 24.632 24.632 24.632 24.632-11.05 24.632-24.632-11.05-24.632-24.632-24.632zm0 34.263c-5.311 0-9.632-4.321-9.632-9.632s4.321-9.632 9.632-9.632 9.632 4.321 9.632 9.632-4.321 9.632-9.632 9.632z"/><path d="m412.955 348.657c-13.582 0-24.632 11.05-24.632 24.632s11.05 24.632 24.632 24.632 24.632-11.05 24.632-24.632-11.05-24.632-24.632-24.632zm0 34.263c-5.311 0-9.632-4.321-9.632-9.632s4.321-9.632 9.632-9.632c5.31 0 9.632 4.321 9.632 9.632s-4.321 9.632-9.632 9.632z"/><path d="m497.005 273.955-47.186-17.031c-.107-.039-.217-.076-.327-.109-2.125-.659-3.758-2.33-4.365-4.47l-13.974-49.186c-3.818-13.437-14.704-23.54-27.895-26.725v-18.772c0-17.093-13.905-30.998-30.998-30.998h-33.35v-8.013c0-23.231-18.899-42.13-42.13-42.13h-178.107c-4.143 0-7.5 3.358-7.5 7.5s3.357 7.5 7.5 7.5h178.107c14.959 0 27.13 12.17 27.13 27.13v251.976h-52.12l-34.953-49.015c-2.405-3.371-7.086-4.158-10.461-1.752-3.372 2.405-4.157 7.088-1.752 10.461l28.743 40.306h-71.553c-1.4-33.061-28.725-59.529-62.124-59.529s-60.724 26.468-62.124 59.529h-32.094c-5.774 0-10.472-4.697-10.472-10.471v-112.615h118.607c20.028 0 38.929 9.735 50.557 26.042l25.92 36.348c1.464 2.052 3.771 3.146 6.113 3.146 1.506 0 3.027-.453 4.348-1.394 3.372-2.405 4.157-7.088 1.752-10.461l-25.92-36.348c-14.438-20.246-37.902-32.333-62.77-32.333h-118.607v-113.89c0-14.96 12.171-27.13 27.131-27.13h46.542c4.143 0 7.5-3.358 7.5-7.5s-3.357-7.5-7.5-7.5h-46.542c-23.232 0-42.131 18.899-42.131 42.13v241.505c0 14.045 11.427 25.471 25.472 25.471h33.26c5.74 28.401 30.889 49.852 60.958 49.852 30.068 0 55.218-21.451 60.958-49.852h171.351c5.74 28.401 30.888 49.852 60.957 49.852 30.068 0 55.218-21.451 60.958-49.852h10.458c15.234 0 27.629-12.395 27.629-27.629v-63.511c-.001-9.44-6.019-17.667-14.996-20.532zm-80.281-66.697 13.974 49.186c.01.036.024.071.034.107h-49.583c-5.604 0-10.163-4.559-10.163-10.163v-56.018h23.386c10.336.001 19.527 6.945 22.352 16.888zm-44.463-65.594c8.821 0 15.998 7.177 15.998 15.999v17.708h-49.349v-33.707zm-252.572 278.815c-26.021 0-47.191-21.17-47.191-47.191s21.17-47.191 47.191-47.191 47.191 21.17 47.191 47.191-21.169 47.191-47.191 47.191zm293.266 0c-26.021 0-47.19-21.17-47.19-47.191s21.17-47.191 47.19-47.191c26.021 0 47.191 21.17 47.191 47.191s-21.169 47.191-47.191 47.191zm84.045-62.481c0 6.964-5.665 12.629-12.629 12.629h-9.292c-1.4-33.061-28.725-59.529-62.124-59.529s-60.723 26.468-62.123 59.529h-11.922v-180.256h17.075v56.018c0 13.875 11.288 25.163 25.163 25.163h63.326c.457 0 .903-.047 1.338-.126l46.245 16.691c.108.039.218.076.327.11 2.761.854 4.615 3.371 4.615 6.26v63.511z"/><path d="m47.349 147.73v19.513c0 8.32 6.769 15.089 15.089 15.089h79.561c8.32 0 15.089-6.769 15.089-15.089v-19.513c0-8.32-6.768-15.089-15.089-15.089h-79.561c-8.321-.001-15.089 6.768-15.089 15.089zm94.738 0v19.513c0 .049-.04.089-.089.089h-79.56c-.049 0-.089-.04-.089-.089v-19.513c0-.049.04-.089.089-.089h79.561c.048-.001.088.039.088.089z"/><path d="m363.585 286.302c-4.143 0-7.5 3.358-7.5 7.5v12.939c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-12.939c0-4.142-3.357-7.5-7.5-7.5z"/>
        </g>
      </g>
    </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100vh',
    maxWidth: '100%',
  },
  leftArea: {
    width: '70%',
    minHeight: '100%',
    height: '100%',
  },
  rightArea: {
    width: '25%',
    maxHeight: '100vh',
    height: '100vh',
    backgroundColor: '#FFF',
    borderLeft: '1px solid #F4F6F8',
    position: 'fixed',
    right: 15,
    padding: theme.spacing(3),
  },
  mainArea: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    background: '#F4F6F8',
    display: 'flex',
    flexDirection: 'row',
    overflowY: 'scroll'
  },
  contentArea: {
    width: '100%',
    padding: theme.spacing(3),
  },
  cardroot: {
    minWidth: "100%",
    marginTop: 0
  },
  crdContentStyle: {
    paddingTop: 10
  },
  mapArea: {
    width: '100%',
    height: 300
  },
  notchStyle: {
    border: 'none'
  },
  inputRootStyle: {
    paddingRight: 0
  },
  nativeselect: {
    width: '100%',
  },
  formControl: {
    marginBottom: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },
  textField: {
    position: 'relative',
    backgroundColor: '#F2F4F7',
    border: '1px solid #fff',
    width: '100%',
    borderRadius: '70px',
    transition: theme.transitions.create(['background-color']),
    '&$focused': {
      backgroundrColor: '#F2F6FC',
    },
    '&:hover': {
     backgroundColor: '#F2F6FC',
   },
  },
  formArea: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
    marginTop: 15,
    paddingLeft: 25,
    paddingRight: 25
  },
  popTitle: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  imgArrangeStyle: {
    position: 'relative',
    display: 'flex',
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center'
  },

  profileAvatar: {
    width: 100,
    height: 100,
    border: '4px solid #fff',
    background: '#e1e1e1',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 20
 },
 formComponent: {
   width: '100%',
   marginBottom: theme.spacing(2),
   fontSize: 10
 },
 failedStyles: {
   color: theme.palette.priority.red,
   borderColor: theme.palette.priority.red
 },
 failedLabelStyle: {
   color: theme.palette.priority.red,
   fontSize: 11
 },
 successfulStyles: {
   color: theme.palette.priority.green,
   borderColor: theme.palette.priority.green
 },
 successfulLabelStyle: {
   color: theme.palette.priority.green,
   fontSize: 11
 },
 buttonStyle: {
   borderWidth: 1,
   borderStyle: 'solid',
   borderRadius: 70,
   borderColor: '#fff',
   textTransform: 'none',
   fontSize: 14,
   minHeight: 50,
   fontWeight: 400,
   color: '#fff',
   font: 'Helvetica Neue',
   backgroundColor: theme.palette.primary.main,
   '&:hover': {
     backgroundColor: theme.palette.primary.dark,
     color: "#fff",
   }
 },
 buttonSaveProgress: {
   color: '#2688fb',
   position: 'absolute',
   top: '50%',
   left: '50%',
   marginTop: -12,
   marginLeft: -12,
 },
 btnContainer: {
   width: '100%',
   maxWidth: '100%',
   flexBasis: '100%',
   webkitFlexBasis: '100%',
   marginTop: 5
 }
}));

const HistoryDetails = props => {
  const classes = useStyles();
  //let history = useHistory();
  const { data } = props.location.state;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBsXpG7il1ZQz-B-w0vEelhTkTTMSxoi5o"
  })

  const [response, setResponse] = useState(null);
  //const [selectedRider, setSelectedRider] = useState('');
  const [resFullname, setFullname] = useState('');
  const [resVehicle, setResVehicle] = useState('');
  const [resPhoneNo, setPhoneNo] = useState('');
  const [isOnline, setIsOnline] = useState(null);
//  const [loading, setLoading] = useState(false);
//  const [serverError, setServerError] = useState(null);
//  const [failed, setFailed] = useState(false);

  useEffect(() => {
    DB.collection("riders").doc(data[0].driverid).get().then((doc) => {
      if (doc.exists) {
        setFullname(doc.data().name);
        setResVehicle(doc.data().vehicle);
        setPhoneNo(doc.data().phoneNumber);
        setIsOnline(doc.data().isOnline);
      }
    });
  }, []);

  const directionsCallback = React.useCallback((res) => {
   if (res !== null) {
     if (res.status === 'OK') {
       setResponse(res);
     } else {
       console.log('response: ', res)
     }
   }
 }, [response])

 /*const handleAssign = () => {
   setLoading(true);
   const batch = DB.batch();

   const tripsRef = DB.collection("trips").doc(data[0].id)
   batch.update(tripsRef,
     {
       "driverid": firebase.firestore.FieldValue.delete(),
       "assigned": false
     }
   );

   const ridersRef = DB.collection("riders").doc(data[0].driverid)
   batch.update(ridersRef,
     {
       "assigned": false
     }
   );

   batch.commit().then(() => {
     setLoading(false);
     history.push('/orders');
  })
  .catch((error) => {
    setLoading(false);
    setServerError("Error removing assigned rider: " + error);
    setFailed(true);
  });
 }
*/
  return (
    <div className={classes.root}>
      <div className={classes.mainArea}>
        <div className={classes.leftArea}>
          <div className={classes.mapArea}>
            {isLoaded &&
              <GoogleMap
                id='order-map'
                mapContainerStyle={{
                  width: '100%',
                  height: '300px'
                }}
                center={{
                  lat: data[0].pickup.coordinates.latitude,
                  lng: data[0].pickup.coordinates.longitude
                }}
                zoom={15}
                onLoad={map => {
                  console.log('DirectionsRenderer onLoad map: ', map)
                }}
                onUnmount={map => {
                  console.log('DirectionsRenderer onUnmount map: ', map)
                }}
              >

                <DirectionsService
                      // required
                      options={{
                        destination: new google.maps.LatLng(data[0].delivery.coordinates.latitude, data[0].delivery.coordinates.longitude),
                        origin: new google.maps.LatLng(data[0].pickup.coordinates.latitude, data[0].pickup.coordinates.longitude),
                        travelMode: google.maps.TravelMode.DRIVING
                      }}
                      // required
                      callback={directionsCallback}
                      onLoad={directionsService => {
                        console.log('DirectionsService onLoad directionsService: ', directionsService)
                      }}
                      // optional
                      onUnmount={directionsService => {
                        console.log('DirectionsService onUnmount directionsService: ', directionsService)
                      }}
                    />
                    {
                     response !== null && (
                       <DirectionsRenderer
                         options={{
                           directions: response
                         }}
                         onLoad={directionsRenderer => {
                           console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                         }}
                         onUnmount={directionsRenderer => {
                           console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                         }}
                       />
                     )
                   }
              </GoogleMap>
            }
          </div>
          <div className={classes.contentArea}>
            <Card className={classes.cardroot} elevation={1}>
            <CardHeader
                title={
                  <Typography variant="h5" component="h6">
                    Trip Information
                  </Typography>
                }
              />
              <CardContent className={classes.crdContentStyle}>
                <Typography variant="title" component="h4" gutterBottom>
                  Trip Details
                </Typography>
                <Grid container justifyContent="space-between" spacing={1}>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Pickup Address
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].pickup.address}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Delivery Address
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].delivery.address}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Order Date & Time
                    </Typography>
                    <Typography variant="caption" component="span">{moment(data[0].date).format('DD/MM/YYYY hh:mm:ss A')}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Trip Distance (Meters)
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].distance}m</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Estimated Cost
                    </Typography>
                    <Typography variant="caption" component="span"><NumberFormat value={data[0].transaction.cost} displayType={'text'} thousandSeparator={true} /></Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Payment Method
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].transaction.paymentMethod}</Typography>
                  </Grid>
                </Grid>
                <hr style={{ marginBottom: 10, marginTop: 10, borderTop: '1px solid #D3ECFF' }} />
                <Typography variant="title" component="h4" gutterBottom>
                  Sender Details
                </Typography>
                <Grid container justifyContent="space-between" spacing={1} style={{ marginBottom: 15 }}>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Full Name
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].pickup.fullName}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Email Address
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].pickup.email}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Phone Number
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].pickup.phoneNumber}</Typography>
                  </Grid>
                </Grid>
                <hr style={{ marginBottom: 10, marginTop: 10, borderTop: '1px solid #D3ECFF' }} />
                <Typography variant="title" component="h4" gutterBottom>
                  Receiver Details
                </Typography>
                <Grid container justifyContent="space-between" spacing={1}>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Full Name
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].delivery.fullName}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Email Address
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].delivery.email}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Phone Number
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].delivery.phoneNumber}</Typography>
                  </Grid>
                </Grid>
                <hr style={{ marginBottom: 10, marginTop: 10, borderTop: '1px solid #D3ECFF' }} />
                <Typography variant="title" component="h4" gutterBottom>
                  Package Details
                </Typography>
                <Grid container justifyContent="space-between" spacing={1} style={{ marginBottom: 15 }}>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Weight(Grams)
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].package.weight}g</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Type
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].package.type}</Typography>
                  </Grid>
                  <Grid item lg={4}>
                    <Typography variant="subtitle2" component="h6">
                      Quantity
                    </Typography>
                    <Typography variant="caption" component="span">{data[0].package.quantity}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className={classes.rightArea}>
           <form className={classes.form} autoComplete="off">
             <div className={classes.popTitle}>
                 <Typography variant="h6">Driver Information</Typography>
             </div>
             <div className={classes.imgArrangeStyle}>
                 <Avatar alt="avatar" src="" className={classes.profileAvatar} />
             </div>
             <div className={classes.formArea}>
               <InputLabel shrink htmlFor="fullname">
                 Fullname
               </InputLabel>
               <FormControl className={classes.formComponent}>
                 <TextField
                     id="fullname-input"
                     className={classes.textField}
                     fullWidth
                     disabled
                     name="fullname"
                     type="text"
                     value={resFullname}
                     InputProps={{
                       disableunderline: "true",
                       classes: {
                         notchedOutline: classes.notchStyle,
                         input: classes.inputStyle
                       },
                       style: {fontSize: 12}
                     }}
                   />
               </FormControl>
               <InputLabel shrink htmlFor="phoneno">
                 Phone No.
               </InputLabel>
               <FormControl className={classes.formComponent}>
                 <TextField
                     id="phoneno-input"
                     className={classes.textField}
                     fullWidth
                     disabled
                     name="phoneno"
                     type="text"
                     value={resPhoneNo}
                     InputProps={{
                       disableunderline: "true",
                       classes: {
                         notchedOutline: classes.notchStyle,
                         input: classes.inputStyle
                       },
                       style: {fontSize: 12}
                     }}
                     aria-describedby="phoneno-error"
                   />
                 </FormControl>
                 <Grid container spacing={1} style={{ marginTop: 5 }}>
                   <Grid item lg={6}>
                     <InputLabel shrink>
                      <Typography variant="title" align="center" component="h4">Status</Typography>
                     </InputLabel>
                     <FormControl className={classes.formComponent}>
                       {isOnline === true ?
                         (<Chip
                           label="Online"
                           variant="outlined"
                           size="large"
                           style={{ width: '100%' }}
                           classes={{ root: classes.successfulStyles, label: classes.successfulLabelStyle }}
                         />)
                       :
                       isOnline === false ?
                       (<Chip
                         label="Offline"
                         variant="outlined"
                         size="large"
                         style={{ width: '100%' }}
                         classes={{ root: classes.failedStyles, label: classes.failedLabelStyle }}

                       />)
                       :
                       (<Chip
                         label="-"
                         variant="outlined"
                         size="large"
                         style={{ width: '100%' }}

                       />)
                       }

                     </FormControl>
                   </Grid>
                   <Grid item lg={6}>
                     <InputLabel shrink>
                      <Typography variant="title" align="center" component="h4">Vehicle</Typography>
                     </InputLabel>
                     <FormControl className={classes.formComponent}>
                       {
                         resVehicle === "Bicycle" ?
                           (<Chip
                             label="Bicycle"
                             size="large"
                             icon={<BicycleIcon />}
                             style={{ width: '100%' }}
                           />
                       )
                       :
                       resVehicle === "Motorbike" ?
                       (
                         <Chip
                         label="Motorbike"
                         size="large"
                         icon={<MotorbikeIcon />}
                         style={{ width: '100%' }}
                         />
                       )
                       :
                       resVehicle === "Car" ?
                         (
                           <Chip
                             label="Car"
                             size="large"
                             icon={<CarIcon />}
                             style={{ width: '100%' }}
                           />
                         )
                         :
                         resVehicle === "Van" ?
                         (<Chip
                           label="Van"
                           size="large"
                           icon={<VanIcon />}
                           style={{ width: '100%' }}
                         />
                       )
                       :
                       (<Chip
                         label="-"
                         size="large"
                         style={{ width: '100%' }}
                       />
                      )

                       }

                     </FormControl>
                   </Grid>
                 </Grid>
               </div>
             </form>
        </div>
      </div>
    </div>
  );
}

HistoryDetails.propTypes = {
  data: PropTypes.array
};

export default HistoryDetails;
