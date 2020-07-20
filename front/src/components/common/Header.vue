<template>
  <header id="hd">
    <div class="hd-brand">
      <h1 class="logo text-hide">
        <a href=""><img
          src="@/assets/img/logo.svg"
          alt="INZENT"
        ></a>
      </h1>
      <!-- <button type="button" class="menu-toggler d-none d-lg-block"><i class="icon-hamburger-back"></i></button> -->
      <button
        type="button"
        class="menu-toggler d-none d-lg-block"
      >
        <i class="icon-hamburger-back" />
      </button>
      <button
        type="button"
        class="menu-toggler d-lg-none"
      >
        <i class="icon-hamburger-back" />
      </button>
    </div>
    <ul class="breadcrumb">
      <li class="breadcrumb-item">
        홈
      </li>
      <li
        class="breadcrumb-item active"
        aria-current="page"
      >
        MY page
      </li>
    </ul>
    <div class="hd-side">
      <a
        href=""
        class="icon-info"
        title="수신함"
      />
      <span class="text-dark small">마일리지 10점</span>

      <a
        href=""
        class="icon-profile"
        title="마이페이지"
      />
      <span class="text-dark small"><i
        style="margin-left: 5px;"
        class="icon-down"
      /></span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  mounted () {

  }
}
