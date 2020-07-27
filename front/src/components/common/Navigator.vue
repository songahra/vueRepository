<template>
  <nav
    id="sidebar"
    class="panel"
  >
    <div
      class="panel-content"
      style="
    width: 237px;
"
    >
      <ul id="gnb">
        <li>
          <a
            href="/knm/quWrite"
            class="menu-collapse-link collapsed"
          ><i class="icon-std-code text-dark" />기술 문의</a>
          <a
            href="#menu-knowledge-management"
            class="menu-collapse-link collapsed"
            data-toggle="collapse"
          ><i class="icon-result text-dark" />지식 관리<i class="icon-down text-dark" /></a>
          <ul
            id="menu-knowledge-management"
            class="menu-collapse collapse"
            data-parent="#gnb"
          >
            <li class="menu-item">
              <a
                href="/knm/mainList"
                class="menu-link"
              >지식 관리</a>
            </li>
            <li class="menu-item">
              <a
                href="/knm/myList"
                class="menu-link"
              >내가 문의한 질문</a>
            </li>
            <li class="menu-item">
              <a
                href="/knm/anList"
                class="menu-link"
              >내가 답변한 질문</a>
            </li>
          </ul>
          <a
            class="menu-collapse-link collapsed"
            data-toggle="collapse"
          ><i class="icon-arrange text-dark" />지식 자료실</a>
          <a
            class="menu-collapse-link collapsed"
            data-toggle="collapse"
          ><i class="icon-graph text-dark" />지식자산 통계</a>
          <a
            href="/noticeList"
            class="menu-collapse-link collapsed"
          ><i class="icon-alarm text-dark" />공지사항</a>
          <a
            href="#menu-setting"
            class="menu-collapse-link collapsed"
            data-toggle="collapse"
          ><i class="icon-set text-dark" />설정<i class="icon-down text-dark" /></a>
          <ul
            id="menu-setting"
            class="menu-collapse collapse"
            data-parent="#gnb"
          >
            <li class="menu-item">
              <a
                href="/adm/pjList"
                class="menu-link"
              >프로젝트</a>
            </li>
            <li class="menu-item">
              <a
                href="/adm/authList"
                class="menu-link"
              >사용자 권한</a>
            </li>
            <li class="menu-item">
              <a
                href="/adm/solList"
                class="menu-link"
              >지식포인트</a>
            </li>
          </ul>
          <a
            href="/profile"
            class="menu-collapse-link collapsed"
          ><i class="icon-user text-dark" />프로필 관리</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navigator',
  methods: {

  }
}
</script>

<style>

</style>
