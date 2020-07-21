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
          <!-- [D] 활성화 : collapsed 클래스 삭제-->
          <a
            href="/knm/quWrite"
            class="menu-link "
          ><i class="icon-std-code text-dark" />기술 문의</a>

          <a
            href=""
            class="menu-link"
          ><i class="icon-result text-dark" />지식 관리<i
            class="icon-down"
            style="margin-right: 0px;"
          /></a>
          <a
            href="/knm/mainList"
            class="menu-collapse-link collapsed small text-dark"
            data-toggle="collapse"
            style="margin-left: 20px"
          >- 지식 관리</a>
          <a
            href="/knm/myList"
            class="menu-collapse-link collapsed small text-dark"
            data-toggle="collapse"
            style="margin-left: 20px"
          >- 내가 문의한 질문</a>
          <a
            href="/knm/anList"
            class="menu-collapse-link collapsed small text-dark"
            data-toggle="collapse"
            style="margin-left: 20px"
          >- 내가 답변한 질문</a>

          <a
            href=""
            class="menu-link"
          ><i class="icon-arrange text-dark" />지식 자료실</a>

          <a
            href=""
            class="menu-link"
          ><i class="icon-graph text-dark" />지식자산 통계</a>

          <a
            href=""
            class="menu-link"
          ><i class="icon-alarm text-dark" />공지사항</a>

          <a
            href=""
            class="menu-link"
          ><i class="icon-set text-dark" />설정<i
            class="icon-down"
            style="margin-right: 0px;"
          /></a>
          <a
            href="/adm/PJList"
            class="menu-collapse-link collapsed small text-dark"
            data-toggle="collapse"
            style="margin-left: 20px"
          >- 프로젝트</a>
          <a
            href="#menu-cmmn"
            class="menu-collapse-link collapsed small text-dark"
            data-toggle="collapse"
            style="margin-left: 20px"
          >- 사용자 권한</a>
          <a
            href="#menu-cmmn"
            class="menu-collapse-link collapsed small text-dark"
            data-toggle="collapse"
            style="margin-left: 20px"
          >- 시스템 코드</a>
          <a
            href="/adm/solList"
            class="menu-collapse-link collapsed small text-dark"
            data-toggle="collapse"
            style="margin-left: 20px"
          >- 지식포인트</a>

          <a
            href="/profile"
            class="menu-link"
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
