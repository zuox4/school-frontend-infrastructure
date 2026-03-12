import {
  CellHeader,
  CellList,
  CellSimple,
  Panel,
  SearchInput,
  Typography,
} from "@maxhub/max-ui";
import { Bubbles } from "lucide-react";
import React, { useState } from "react";

export default function ContactsServiceApp() {
  const [value, setValue] = useState("");
  return (
    <Panel>
      <Typography.Body>Поиск карточки сотрудника</Typography.Body>
      <SearchInput value={value} onChange={(e) => setValue(e.target.value)} />
      <CellList
        header={<CellHeader>Найдено по запросу {value}"</CellHeader>}
        filled
      >
        <CellSimple before={<Bubbles />} showChevron>
          Найдюк Кирилл
        </CellSimple>
        <CellSimple before={<Bubbles />} showChevron>
          Найдюк Кирилл
        </CellSimple>
        <CellSimple before={<Bubbles />} showChevron>
          Найдюк Кирилл
        </CellSimple>
        <CellSimple before={<Bubbles />} showChevron>
          Найдюк Кирилл
        </CellSimple>
      </CellList>
    </Panel>
  );
}
