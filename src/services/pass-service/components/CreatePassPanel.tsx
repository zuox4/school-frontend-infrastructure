import {
  Avatar,
  Button,
  CellList,
  CellSimple,
  Container,
  Flex,
  Typography,
  Spinner,
  Input,
} from "@maxhub/max-ui";

import { useRef, useState, useMemo } from "react";
import PassForm from "./PassForm";
import ModalFromBottom from "../../../components/ModalFromBottom";
import type { Child } from "../types/child";
import { childrenQueryKeys } from "../hooks/useChilds";
import { childrenService } from "../api/passesApi";
import { useQuery } from "@tanstack/react-query";
import type { UserRole } from "../../../types/services";
import { Search } from "lucide-react";

// Компонент-заглушка для загрузки
export function SkeletonCellList() {
  return (
    <CellList filled mode="island" style={{ padding: 0 }}>
      <CellSimple>
        <Flex justify="center" style={{ padding: "20px" }}>
          <Spinner />
        </Flex>
      </CellSimple>
    </CellList>
  );
}

export default function CreatePassPanel({ role }: { role: UserRole }) {
  const [dataPasses, setDataPasses] = useState<Child[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: children = [], isLoading } = useQuery({
    queryKey: childrenQueryKeys.my(role),
    queryFn: () => childrenService.getStudents(),
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Фильтрация детей по поисковому запросу
  const filteredChildren = useMemo(() => {
    if (!searchQuery.trim())
      return children.sort((a, b) => a.fullname.localeCompare(b.fullname));

    const query = searchQuery.toLowerCase().trim();
    return children.filter((child) => {
      const fullName = child.fullname.toLowerCase();
      const className = child.class_unit_name?.toLowerCase() || "";
      return fullName.includes(query) || className.includes(query);
    });
  }, [children, searchQuery]);

  const handleClick = (child: Child) => {
    if (dataPasses.some((c) => c.external_id === child.external_id)) {
      setDataPasses(
        dataPasses.filter((c) => c.external_id !== child.external_id),
      );
    } else {
      setDataPasses([...dataPasses, child]);
    }
  };

  const handleCloseModal = () => {
    setIsOpenForm(false);
    setDataPasses([]); // Очищаем выбранных детей при закрытии
  };

  const clearSearch = () => {
    setSearchQuery("");
  };
  const button = (
    <Button
      style={{ marginTop: "10px" }}
      stretched
      disabled={dataPasses.length === 0}
      onClick={() => setIsOpenForm(true)}
    >
      {dataPasses.length > 0
        ? `Заказать пропуск (${dataPasses.length})`
        : "Выберите ребенка"}
    </Button>
  );
  // Показываем заглушку во время загрузки
  if (isLoading) {
    return (
      <Container fullWidth ref={containerRef} style={{ width: "100%" }}>
        <Typography.Label
          style={{
            marginBottom: "16px",
            color: "#666",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Мои дети
        </Typography.Label>
        <SkeletonCellList />
      </Container>
    );
  }

  // Если детей нет
  if (!children.length) {
    return (
      <Container fullWidth ref={containerRef} style={{ width: "100%" }}>
        <Typography.Label
          style={{
            marginBottom: "16px",
            color: "#666",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          Мои дети
        </Typography.Label>
        <CellList filled mode="island" style={{ padding: 0 }}>
          <Flex
            direction="column"
            align="center"
            style={{ padding: "32px 20px" }}
          >
            <Typography.Action style={{ color: "gray", textAlign: "center" }}>
              Нет информации о детях
            </Typography.Action>
          </Flex>
        </CellList>
      </Container>
    );
  }

  return (
    <>
      {isOpenForm && (
        <ModalFromBottom
          component={
            <PassForm
              dataPasses={dataPasses}
              closeModal={handleCloseModal}
              setDataPasses={setDataPasses}
            />
          }
          closeModal={handleCloseModal}
        />
      )}

      <Container fullWidth ref={containerRef} style={{ width: "100%" }}>
        {role === "parent" && (
          <Typography.Label
            style={{
              marginBottom: "",
              color: "#666",
              fontSize: "15px",
              fontWeight: "500",
            }}
          >
            Мои дети
          </Typography.Label>
        )}
        <Flex direction="column" align="center" gap={10}>
          <Container>{role === "staff" && button}</Container>

          <CellList filled mode="island" style={{ padding: 0, width: "100%" }}>
            {/* Поле поиска */}
            {role === "staff" && (
              <Container style={{ padding: "12px 16px" }}>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  iconBefore={<Search size={18} color="#999" />}
                  mode="secondary"
                  placeholder="Поиск по имени или классу"
                  style={{ width: "100%" }}
                />
              </Container>
            )}

            {/* Результаты поиска */}
            <Flex
              direction="column"
              align="center"
              style={{ maxHeight: "280px", overflowY: "scroll" }}
            >
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <CellSimple
                    key={child.external_id}
                    before={
                      <Avatar.Container>
                        <Avatar.Text>
                          {child.fullname.split(" ")[1]?.[0] ||
                            child.fullname.split(" ")[0]?.[0] ||
                            "?"}
                        </Avatar.Text>
                      </Avatar.Container>
                    }
                    title={
                      child.fullname.split(" ")[0] +
                      " " +
                      child.fullname.split(" ")[1]
                    }
                    subtitle={child.class_unit_name}
                    after={
                      dataPasses.some(
                        (c) => c.external_id === child.external_id,
                      ) && (
                        <Button
                          style={{
                            minWidth: "32px",
                            height: "32px",
                            color: "white",
                          }}
                        >
                          ✓
                        </Button>
                      )
                    }
                    onClick={() => handleClick(child)}
                  />
                ))
              ) : (
                <Flex
                  direction="column"
                  align="center"
                  style={{ padding: "32px 20px" }}
                >
                  <Typography.Action
                    style={{ color: "#999", marginBottom: "8px" }}
                  >
                    Ничего не найдено
                  </Typography.Action>
                  <Typography.Title style={{ color: "#666", fontSize: "14px" }}>
                    Попробуйте изменить запрос
                  </Typography.Title>
                  <Button
                    size="small"
                    onClick={clearSearch}
                    style={{ marginTop: "12px" }}
                  >
                    Очистить поиск
                  </Button>
                </Flex>
              )}
            </Flex>
          </CellList>
          {role === "parent" && button}
        </Flex>
      </Container>
    </>
  );
}
