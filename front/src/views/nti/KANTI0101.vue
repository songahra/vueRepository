<template>
  <div id="wrap">
    <div id="ct">
      <section class="card">
        <header class="card-header">
          <h2 class="card-title">
            <span class="i-rounded bg-danger"><i class="icon-alarm" /></span>공지사항
          </h2>
          <div class="btn-container">
            <a
              href=""
              class="btn btn-m"
            ><span class="hide">글쓰기</span></a>
          </div>
        </header>
        <div class="ct-header">
          <button
            type="button"
            class="btn-filter collapsed d-xl-none"
            data-toggle="collapse"
            data-target="#collapse-filter"
          >
            검색 필터<i class="icon-down" />
          </button>
          <div
            id="collapse-filter"
            class="collapse collapse-filter"
          >
            <div class="filter no-gutters">
              <div
                class="col"
                style="min-width: 70%;"
              >
                <label class="form-control-label">
                  <b class="control-label">제목</b>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="제목을 입력하세요."
                  >
                </label>
              </div>
              <div class="col">
                <label class="form-control-label label-select">
                  <b class="control-label">정렬</b>
                  <select
                    class="form-control selectpicker"
                    title="선택하세요"
                    readonly
                  >
                    <option value="">최신순</option>
                    <option value="">조회수순</option>
                    <option value="">날짜순</option>
                  </select>
                </label>
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-primary"
                >
                  <i class="icon-srch" />조회
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="ct-content">
          <div class="table-responsive">
            <table class="table">
              <colgroup>
                <col style="width: 6%">
                <col style="width: 28%">
                <col style="width: 12%">
                <col style="width: 12%">
                <col style="width: 12%">
                <col style="width: 12%">
                <col style="width: 8%">
              </colgroup>
              <thead>
                <tr>
                  <th>글번호</th>
                  <th>제목</th>
                  <th>솔루션</th>
                  <th>작성자</th>
                  <th>첨부</th>
                  <th>작성일</th>
                  <th>조회수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>iGate 패치 안내</td>
                  <td>iGate</td>
                  <td>홍길동</td>
                  <td><i class="icon-link" />(4)</td>
                  <td>20. 05. 17 14:16</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>iGate 패치 안내</td>
                  <td>iGate</td>
                  <td>홍길동</td>
                  <td>-</td>
                  <td>20. 05. 17 14:16</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>iGate 패치 안내</td>
                  <td>iGate</td>
                  <td>홍길동</td>
                  <td><i class="icon-link" />(2)</td>
                  <td>20. 05. 17 14:16</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>iGate 패치 안내</td>
                  <td>iGate</td>
                  <td>홍길동</td>
                  <td><i class="icon-link" />(12)</td>
                  <td>20. 05. 17 14:16</td>
                  <td>22</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link page-link-prev"
                href="#"
              ><i class="icon-left" /></a>
            </li>
            <li class="page-item">
              <a
                class="page-link active"
                href="#"
              >1</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="#"
              >2</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                href="#"
              >3</a>
            </li>
            <li class="page-item">
              <a
                class="page-link page-link-next"
                href="#"
              ><span class="icon-right" /></a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style>

</style>
