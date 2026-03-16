import {
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
      <Flex justify="center" style={{ padding: "20px" }}>
        <Spinner />
      </Flex>
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
      style={{
        marginTop: "10px",
        height: "45px",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
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
          {/* <Container>
            {role === "staff" && !!dataPasses.length && button}
          </Container> */}

          <CellList
            style={{
              padding: 0,
              width: "100%",
              background: "rgba(4, 17, 61, 0)",
            }}
          >
            {/* Поле поиска */}
            {role === "staff" && (
              <Container style={{ padding: "12px 16px", height: "65px" }}>
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
              style={{
                maxHeight: "280px",
                overflowY: "scroll",
                padding: "5px",
              }}
              gap={10}
            >
              {filteredChildren.length > 0 ? (
                filteredChildren.map((child) => (
                  <CellSimple
                    key={child.external_id}
                    // before={
                    //   <Avatar.Container>
                    //     <Avatar.Text>
                    //       {child.fullname.split(" ")[1]?.[0] ||
                    //         child.fullname.split(" ")[0]?.[0] ||
                    //         "?"}
                    //     </Avatar.Text>
                    //   </Avatar.Container>
                    // }
                    title={
                      <span style={{ color: "#ffffff", fontWeight: 500 }}>
                        {child.fullname.split(" ")[0] +
                          " " +
                          child.fullname.split(" ")[1]}
                      </span>
                    }
                    subtitle={
                      <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        {child.class_unit_name}
                      </span>
                    }
                    after={
                      dataPasses.some(
                        (c) => c.external_id === child.external_id,
                      ) && (
                        <Button
                          style={{
                            minWidth: "32px",
                            height: "32px",
                            color: "white",
                            background: "rgba(255, 255, 255, 0.2)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            backdropFilter: "blur(5px)",
                            WebkitBackdropFilter: "blur(5px)",
                            borderRadius: "8px",
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
            {button}
          </CellList>
        </Flex>
      </Container>
    </>
  );
}
