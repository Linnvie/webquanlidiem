import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "../BangDiem/BangDiem.module.scss";
import classNames from "classnames/bind";
import Table from "react-bootstrap/Table";
const cx = classNames.bind(styles);
function BangDiem() {
  return (
    <>
      <div className={cx("wrapper-bangdiem")}>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            {/* <Card.Title>Card Title</Card.Title> */}
            <div className={cx("desc-bangdiem")}>
              <Card.Text>Mã sinh viên:</Card.Text>
              <p></p>
            </div>
            <div className={cx("desc-bangdiem")}>
              <Card.Text>Tên sinh viên:</Card.Text>
              <p></p>
            </div>
            <div className={cx("desc-bangdiem")}>
              <Card.Text>Lớp:</Card.Text>
              <p></p>
            </div>
            <div className={cx("desc-bangdiem")}>
              <Card.Text>Ngành:</Card.Text>
              <p></p>
            </div>
          </Card.Body>
        </Card>
      </div>
      <di >
          <Table striped bordered hover className={cx('table-bangdiem')}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã môn</th>
                <th>Tên môn</th>
                <th>Username</th>
                <th>CC</th>
                <th>%CC</th>
                <th>%KT</th>
                <th>%SE</th>
                <th>%Thi</th>
                <th>Điểm CC</th>
                <th>Điểm KT</th>
                <th>Điểm TH</th>
                <th>Điểm SE</th>
                <th>Thi lần 1</th>
                <th>TK(10)</th>
                <th>TK(CK)</th>
                <th>KQ1</th>
                <th>KQ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                
              </tr>
              <tr>
              <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
              <td>3</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              
            </tbody>
          </Table>
      </di >
    </>
  );
}

export default BangDiem;
